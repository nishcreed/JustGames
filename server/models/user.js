const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=mongoose.Schema({
    email:String,
    username:String,
    password:String,
});

module.exports=mongoose.model('User',userSchema);