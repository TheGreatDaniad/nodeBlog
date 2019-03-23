var express = require('express');
var router = express.Router();
var User = require('../models/users');
var passport = require('passport');
var localStrategy=require('passport-local').Strategy;
var hashing = require('node-php-password');


passport.use(new localStrategy(function(username,password,done){
  User.checkUserName(username,function(err,user){
    if (err) throw err;
    if (!user) {
      console.log('unknown user');
      return done(null,false,{message:'user not found',failureFlash:'user not found'});
    }
    if(hashing.verify(password,user.password)){
      console.log(user.username ,' logged in')

      return done (null,user);
    }
    else{
    return done(null,false , {message : 'password is wrong',failureFlash: 'password is wrong'});
    }
  });
}));


// Session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


/* GET users listing. */

router.get('/login',function(req,res){
  res.render('login',{user:req.user});
});
router.get('/register',function(req,res){
  res.render('register');
});
router.get('/logout',function(req,res){
  req.logout();
  req.flash('success','you are logged out');
  res.redirect('/users/login');
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/',
  successFlash:'you are logged in successfully',
  failureRedirect:'/users/login',
  failureFlash:'invalid credentials'
}),
function(req,res){

req.flash('flash','you are logged in ');
res.redirect('/');
});

router.post('/register',function(req,res){
  name = req.body.name;
  username=req.body.username;
  email=req.body.email;
  password=req.body.password1;
  hashedPassword = hashing.hash(password);
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
        password:hashedPassword
      });
      newUser.save();
      req.flash('you registered successfully');
      res.render('index');
  }
});


module.exports = router;
