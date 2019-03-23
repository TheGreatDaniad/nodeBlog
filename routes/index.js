var express = require('express');
var router = express.Router();
var Post = require('../models/posts');


/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({},function(err,posts){
    if (err) throw err;
    if(posts) {
      res.render('index', { title: 'Express' ,posts:posts});

    }
  });
});

module.exports = router;
