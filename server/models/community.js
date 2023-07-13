const mongoose=require('mongoose');

const message = mongoose.Schema({
    text:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    replyForName:String,
    replyForText:String
});

const commSchema=mongoose.Schema({
    title:String,
    message:[message]
});


module.exports=mongoose.model('Community',commSchema);