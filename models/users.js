var mongodb = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeblog');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('connected to database');
});


var userSchema = new mongoose.Schema({
    name : {
        type: String,
        maxlength:30,
        
    },
        email : {
        type: String,
        maxlength:40,
        
    },
    username : {
        type: String,
        maxlength:30,
        
    },
    password : {
        type: String,
        
        
    },
    imagePath : {
        type: String,
        
        
    },
    role: {
        type: String,
        
        
    },
    bio : {
        type: String,
        
        
    },
    joined:{
        type:Date,
    }
});
var User = module.exports = mongoose.model('user',userSchema);
module.exports.checkUserName= function(username,callback){
    User.findOne({username:username},callback);
}
