var mongoose = require('mongoose');

var comentSchema = new mongoose.Schema({
    postId:{
        type:String
    },
    parrentComentId:{
        type:String
    },
    email:{
        type:String
    },
    name:{
        type:String
    },
    body:{
        type:String
    },
    date:{
        type:Date
    }

});
module.exports = mongoose.model('comments',comentSchema);