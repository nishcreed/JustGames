if(process.env.NODE_ENV !== "production"){
  require('dotenv').config();
}


const express = require('express');
const sessions = require("express-session")
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');
const Game=require('./models/game')
const User=require('./models/user')
const Blog=require('./models/blog')
const Community=require('./models/community')
const upload = require('./cloudinary/index')
const mongoose=require('mongoose');
const path = require('path')
const cors = require("cors");

process.on('uncaughtException',(err)=>{
  console.log(err)
})

const app = express();
app.engine('ejs',ejsMate);


app.use(cors(
  {
    origin:['https://justgames.onrender.com/'],
    credentials:true
  }
));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('view engine','ejs');
app.use( express.static( path.join(__dirname, './public') ) );

const oneDay = 1000 * 60 * 60 * 24;


app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/game-library-web-app';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});


app.use((req,res,next)=>{
  res.locals.username=req.session.username;
  if(!req.session)
    res.locals.username=null
  next();
})

app.get('/home', async (req, res) => {
  let games=await Game.find();
  const options=games.map((game)=>{return{'label':game.name,'value':game}});
  res.json(options);
});

app.post('/home',async(req,res)=>{
  if(req.body.search==undefined)
    res.redirect('/')
  const games=await Game.find({"name":{$regex: req.body.search,$options:'i'}})
  res.render('home',{ games })
});

app.post('/register',async (req,res)=>{
  const {email,username,password}=req.body;
  let t=await User.findOne({'email':email});
  if(t){
    return res.status(404).send("Email exists")
  }
  t=await User.findOne({'username':username})
  if(t){
    return res.status(404).send("Username exists")
  }
  let user=User({email,username,password});
  await user.save();  
  res.status(200).send('Registration successful')
}); 

app.get('/logout',(req,res)=>{
  req.session.destroy();
  res.status(200).send('Logged out');
});

app.post('/login',async (req,res)=>{
  const {username,password}=req.body;
  const user=await User.find({username,password});
  if(user.length==0){
    res.status(404).send('Incorrect Credentials')
  }
  else{
    req.session.username=username;
    res.status(200).send("Logged In");
  }
});

app.get('/blogs',async (req,res) =>{
  const blogs= await Blog.find().populate('user');
  res.json(blogs);
});

app.post('/blogs',
  upload.fields([
          {name:'image1'},
          {name:'image2'},
          {name:'image3'},
          {name:'image4'}
        ]
        ),
        async(req,res)=>{
  const user=await User.findOne({'username':res.locals.username});
  var str= req.body;
  var files=req.files;

  var text=[];
  var image;
  var body=[];
  var j=0;
  var keys=[];
  for(let i in files){
    keys.push(i);
  }
  let fl=0;
  for(let i in str){
    if(i.substring(0,i.length-1)=="text"){
      text.push(str[i]);
      fl=0;
    }
    else if(i.substring(0,i.length-1)=="hidden" && files[keys[j]]!=undefined){
      image=files[keys[j]][0].path;
      var comb={'text':text,'image':image};
      body.push(comb);
      text=[];
      image='';
      j=j+1;
      fl=1;
    }
  }
  if(fl==0){
    var comb={'text':text,'image':image}
    body.push(comb)
  }
  const blog={'title':str.title,'body':body,'user':user._id};
  const eg=Blog(blog);
  await eg.save();
  for(let i of str.games){
    await Game.findOneAndUpdate({'name':i.value},{$push:{'blogs':eg._id}})
  }
  res.status(200).send('Blog has been added')
});

app.get('/blogs/new',async (req,res) =>{
  const games=await Game.find({});
  const options=games.map((game)=>{return{'value':game.name,'label':game.name}});
  res.json(options);
});

app.get('/blogs/:id',async (req,res)=>{
  let blog = await Blog.findById(req.params.id).populate('user');
  blog=blog.toObject();
  var x=blog.user.username
  delete blog.user
  data={username:x,blog:blog}
  res.json(data)
});

app.delete('/blogs/:id',async(req,res)=>{
  await Blog.findByIdAndDelete(req.params.id)
  res.status(200).send('Blog deleted');
});

app.get('/communities',async(req,res)=>{
  const communities = await Community.find({});
  res.json(communities);
});

app.post('/communities',async(req,res)=>{
  const title=req.body.title
  await Community({title}).save();
  res.status(200).send('Community has been created');
});

app.get('/communities/:id',async (req,res)=>{
  const community = await Community.findById(req.params.id).populate('message.user');
  res.json(community);
});

app.post('/communities/:id',async(req,res)=>{
  const user=await User.findOne({'username':res.locals.username});
  const replyForName=req.body.replyForName;
  const replyForText=req.body.replyForText;
  const message = {'text':req.body.text,'user':user._id,
  'replyForName':replyForName,
  'replyForText':replyForText}
  await Community.findOneAndUpdate({_id:req.params.id},{$push:{message:message}});
  res.status(200).send('Message added');
});

app.put('/communities/:id/msg',async(req,res)=>{
  const commId=req.params.id;
  const msgId=req.body.msgId;
  await Community.findOneAndUpdate({_id:commId},
    {$pull:{message:{_id:msgId}}}
  )
  res.status(200).send('Message deleted');
});

app.get('/:id',async (req,res)=>{
  const game = await Game.findById(req.params.id).populate('blogs');
  res.json(game);
});

app.listen(3400, () => {
  console.log('server started in 3400')
});
