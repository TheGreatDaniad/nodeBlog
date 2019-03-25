var mongoose=require('mongoose');


var categorySchema = new mongoose.Schema({
    title : {
        type:String,
        maxlength:100
    },
});

module.exports = mongoose.model('category',categorySchema);
