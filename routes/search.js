var express = require('express');
var Post = require('../models/posts')

var router = express.Router();

router.get('/:query',function(req,res){
    query = req.params.query;
     Post.find({"body":{"$regex":query,"$options":"i"}},function(err,posts){

    //Post.find({$or:[{"title":{"$regex":query,"$options":"i"}},{"body":{"$regex":query,"$options":"i"}}]}),function(err,posts){
        if (err) throw err;
        req.flash("success","search results for: " + query)
        res.render('index',{posts:posts});
    
    });
});


module.exports = router;