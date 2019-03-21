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
        type:date
    },
    author:{
        type:String
    },
    categury:{
        type:String
    },
    slug:{
        type:string,
        maxlength:120
    }
});