const mongoose=require('mongoose');
const Schema=mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/game-library-web-app', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const data=require('./data.json')


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
    imglink:String
});


const Game=mongoose.model('Game',gameSchema);
for(let d of data['results'].slice(0,50)){
    let x=new Array()
    for(let r of d['ratings']){
        let rat={title:r['title'],count:r['count']}
        x.push(rat)
    }
    let y=new Array()
    for(let p of d['platforms']){
        let plat={name:p['platform']['name']}
        y.push(plat)
    }
    let z=new Array();
    for(let g of d['genres']){
        let genre={name:g['name']}
        z.push(genre)
    }
    let w=new Array();
    for(let t of d['tags']){
        let tag={name:t['name']}
        w.push(tag)
    }
    let eg=Game({
        name:d['name'],
        released:d['released'],
        rating:d['rating'],
        ratings_count:d['ratings_count'],
        ratings:x,
        metacritic:d['metacritic'],
        playtime:d['playtime'],
        platforms:y,
        genres:z,
        tags:w,
        imglink:d['background_image']
    })
    eg.save();
}


// Games.insertMany([
//     {overview:'lorem1',platforms:'lorem2',genre:'lorem3',release:2018,publisher:'lorem4'},
//     {overview:'lorem1',platforms:'lorem2',genre:'lorem3',release:2019,publisher:'lorem4'},
//     {overview:'lorem1',platforms:'lorem2',genre:'lorem3',release:2017,publisher:'lorem4'},
// ])//no need to save
//     .then(data =>{
//         console.log('worked')
//         console.log(data);
//     })

// Games.find({})
//     .then(data=>{
//         console.log(data)
//     })
// Games.findById('').then(m =>{})

// Games.updateOne({},{}).then(res => console.log(res))//does not return the doc
// Games.findOneAndUpdate({},{})//returns the doc\

// Games.remove({}).then(data =>console.log(data))
// Games.deleteMany({release:{$gte:2015}}).then(msg => console.log(msg))
// Games.findOneAndDelete({title:'ALien'}).then(m=>console.log(m))
 