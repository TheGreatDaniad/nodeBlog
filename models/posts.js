var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodeblog');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('connected to database');
});

var postSchema = new mongoose.Schema({
    title : { 
        type:String,
        maxlength:120,
    },
    body : {
        type:String,

    },
    date: { 
        type:Date
    },
    author:{
        type:String
    },
    imagePath:{
        type:String
    },
    categury:{
        type:String
    },
    slug:{
        type:String,
        maxlength:120
    },
    category:{
        type:String,
        maxlength:100
    },
    published:{
        type:Boolean
    }
});

Post = module.exports = mongoose.model('post',postSchema);
module.exports.posts = function(callback){
    Post.find(callback);
}