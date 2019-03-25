var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var strategy = require('passport-local').Strategy;
var mongodb=require('mongodb');
var mongoose = require('mongoose');
var bodyParser=require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session')
var expressMessages = require('express-messages');
var fileUpload=require('express-fileupload')
var multer = require('multer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var postRouter  = require('./routes/posts');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// body parser 

app.use(bodyParser());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

//enable file upload


//enables flash messages and session
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//passport initialize
app.use(passport.initialize());
app.use(passport.session());
//body parser initialize
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

//express validator
app.use(expressValidator());



//variables for using in template
app.use(function(req,res,next){
  res.locals.user = req.user || null ;
  res.locals.path = req.path;
  res.locals.host = req.hostname;
  res.locals.moment= require('moment'); // for making times beautifull
  next();
});

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);
app.use('/posts',postRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
