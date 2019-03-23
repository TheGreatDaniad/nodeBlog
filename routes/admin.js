var express=require('express');
var multer = require('multer');
var router = express.Router();
var Post = require('../models/posts');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-'+file.originalname)
    }
  });
  
var upload = multer({ storage: storage });

router.get('/newpost',ensureAuthenticated,function(req,res){
    res.render('postEdittor');
});
function ensureAuthenticated (req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/users/login');
}

router.post('/newpost',ensureAuthenticated,upload.single('image'),function(req,res,next){
    title = req.body.title;
    author=req.body.author;
    postBody=req.body.body;
    
    if(req.file){
        postImageOriginalName = req.file.originalname;
        postImageName         = req.file.filename;
        postImageMimeType     = req.file.mimetype;
        postImagePath         = req.file.path;
        postImageExt          = req.file.extention;
        postImageSize         = req.file.size;
        console.log(postImageExt);
        console.log(postImageMimeType);
        console.log(postImageName);
        console.log(postImageOriginalName);
        console.log(postImagePath);
        console.log(postImageSize);
    }
    else{
        postImagePath = '/noImage.png';
        
    }


    //form validation 
    req.checkBody('title','title is empty').notEmpty();
    req.checkBody('body','post body is empty').notEmpty();

    errors = req.validationErrors();
    if (errors){
        res.render('postEdittor',{errors:errors})
    }
    else{
        newPost = new Post({
            title:title,
            body:postBody,
            date:Date.now(),
            author:req.user.username,
            imagePath:postImageName
            
        });
        newPost.save();
        const file = req.file

        res.render('postEdittor',{success:true});
    }
});
module.exports = router;