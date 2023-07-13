const mongoose=require('mongoose');

const body=mongoose.Schema({
    text:[{type:String}],
    image:{type:String}
})

const blogSchema=mongoose.Schema({
    title:String,
    body:[body],
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
});


module.exports=mongoose.model('Blog',blogSchema);