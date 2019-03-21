var express = require('express');
var router = express.Router();
var User = require('../models/users');
var passport = require('passport');
var localStrategy=require('passport-local').Strategy;


passport.use(new localStrategy(function(username,password,done){
  User.checkUserName(username,function(err,user){
    if (err) throw err;
    if (!user) {
      console.log('unknown user');
      return done(null,false,{message:'user not found'});
    }
    if(user.password!=password){
      return done(null,false , {message : 'password is wrong'});
    }
    return done (null,user);
  });
}));


// Session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


/* GET users listing. */

router.get('/login',function(req,res){
  res.render('login',{flash:req.flash});
});
router.get('/register',function(req,res){
  res.render('register');
});

router.post('/login',passport.authenticate('local'),function(req,res){

req.flash='you are logged in ';
res.redirect('/');
});

router.post('/register',function(req,res){
  name = req.body.name;
  username=req.body.username;
  email=req.body.email;
  password=req.body.password1;
  console.log(req.body);
  //form errors
  req.checkBody('name','name is required').notEmpty();
  req.checkBody('username','username is required').notEmpty();
  req.checkBody('email','email is required').notEmpty();
  req.checkBody('email','email is not valid').isEmail();

  req.checkBody('password1','password is required').notEmpty();
  req.checkBody('password2','passwords does not match').equals(password);
  errors = req.validationErrors();
  if ( errors) {
    res.render('register',{errors:errors,
    name:name,
    email:email,
    username:username
    });


  }
  else{
      newUser = new User({
        name:name,
        email:email,
        username:username,
        password:password
      });
      newUser.save();
      req.flash='you registered successfully';
      res.render('index');
  }
});


module.exports = router;
