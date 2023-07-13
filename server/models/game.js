const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ratings=mongoose.Schema({
    title:String,
    count:Number
});
const platforms=mongoose.Schema({
    name:String,
});
const genres=mongoose.Schema({
    name:String
});
const tags=mongoose.Schema({
    name:String
});
const gameSchema=mongoose.Schema({
    name:String,
    released:String,
    rating:Number,
    ratings_count:Number,
    ratings:[ratings],
    metacritic:Number,
    playtime:Number,
    platforms:[platforms],
    genres:[genres],
    tags:[tags],
    blogs:[{type:Schema.Types.ObjectId,ref:'Blog'}],
    imglink:String,
});

module.exports=mongoose.model('Game',gameSchema);
