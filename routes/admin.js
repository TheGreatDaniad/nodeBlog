var express=require('express');
var multer = require('multer');
var router = express.Router();
var Post = require('../models/posts');
var Category = require('../models/categories')

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
    res.render('newpost');
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
    postCategory = req.body.category
    
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
        console.log(typeof(errors));
        res.render('newpost',{errors:errors})
    }
    else{
        newPost = new Post({
            title:title,
            body:postBody,
            date:Date.now(),
            author:req.user.username,
            imagePath:postImageName,
            category:postCategory
            
        });
        newPost.save();
        const file = req.file
        req.flash("success","post published successfully")

        res.redirect('/admin/newpost');
    }
});


router.get('/addcategory',ensureAuthenticated,function(req,res){
   
        res.render('addcategory');

    });

router.post('/addcategory',ensureAuthenticated,function(req,res){
   
   category = req.body.category;
   cat = new Category({
       title:category
   });
   cat.save();
   req.flash('success','new category submitted')
   res.redirect('/admin/addcategory');

});


    router.get('/edit/:id',ensureAuthenticated,function(req,res){
    var id = req.params.id;
    Post.findOne({_id:id},function(err,post){
        if (err) throw err;
        if (!post) res.sendStatus(404);
        Category.find({},function(err,category){
            if(err) throw err;
            var categories = category;
            res.render('postEdittor',{categories:categories,post:post});
            
        });
        
    });
    });
    
    router.post('/edit/:id',ensureAuthenticated,upload.single('image'),function(req,res){
      
        var id = req.params.id;
        Post.findOne({_id:id},function(err,post){
            if (err) throw err;
            if (!post) res.sendStatus(404);
         
            title = req.body.title;
            author=req.body.author;
            postBody=req.body.body;
            postCategory = req.body.category;
            console.log(req.body.title);
            console.log(postBody);
            console.log(postCategory);
            
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
                postImagePath = null;
                
            }
        
        
            //form validation 
            req.checkBody('title','title is empty').notEmpty();
            req.checkBody('body','post body is empty').notEmpty();
        
            errors = req.validationErrors();
            if (errors){
                console.log(typeof(errors));
                res.render('postEdittor',{errors:errors,post:post})
            }
            else{
               
                    post.title=title;
                    post.body=postBody;
                    post.date=Date.now();
                    post.category=postCategory;
                    if (postImagePath){
                    post.imagePath=postImageName;
                    }
                    post.save();
                    req.flash("success","post published successfully")
        
                    res.redirect('#');
                }
               
            });
              
            
            
        });
    
        
    
module.exports = router;