var express=require('express');
var router = express.Router();

router.get('/newpost',ensureAuthenticated,function(req,res){
    res.render('postEdittor');
});
function ensureAuthenticated (req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/users/login');
}

router.post('/newpost',function(req,res){
    title = req.body.title;
    author=req.body.author;
    postBody=req.body.body;
    
})
module.exports = router;