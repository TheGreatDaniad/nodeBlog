var express = require('express');
var router = express.Router();
var Post = require('../models/posts');

router.get('/:id',function(req,res){
var id = req.params.id;
Post.findOne({_id:id},function(err,post){
    if (err) throw err;
    if (!post) res.sendStatus(404);
    res.render('post',{post:post});
});
});

module.exports = router;