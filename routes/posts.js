var express = require('express');
var router = express.Router();
var Post = require('../models/posts');
var Comment = require('../models/coments')
router.get('/:id',function(req,res){
var id = req.params.id;
Post.findOne({_id:id},function(err,post){
    if (err) throw err;
    if (!post) res.sendStatus(404);
    Comment.find({postId:id},function(err,comments){

    res.render('post',{post:post,comments:comments});
});
});
});
router.post('/:id',function(req,res){
    var id = req.params.id;
    Post.findOne({_id:id},function(err,post){
        if (err) throw err;
        if (!post) res.sendStatus(404);
            email = req.body.email;
            name=req.body.name;
            commentBody=req.body.body;
            
        
        
            //form validation 
            req.checkBody('name','title is empty').notEmpty();
            req.checkBody('body','post body is empty').notEmpty();
            req.checkBody('email','email is empty').notEmpty();
            req.checkBody('email','please enter a valid email address').isEmail();

        
            errors = req.validationErrors();
            if (errors){
                res.render('post',{errors:errors,post:post})
            }
            else{
                newComment = new Comment({
                    name:name,
                    email:email,
                    body:commentBody,
                    postId:id,
                    date:Date.now()

                    
                });
                newComment.save();
                req.flash("success","Comment submitted successfully")
        
                res.redirect('');
            }
        });
    });
        
        
 
module.exports = router;