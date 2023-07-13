import { useState,useEffect } from "react";
import axios from 'axios'
import Cards from './cards/Cards'
import Navbar from "./navbar/NavBar";
import Register from "./register/Register";
import Login from "./login/Login";
import Blogs from "./blogs/Blogs";
import Blog from "./blog/Blog";
import NewBlog from "./new-blog/NewBlog";
import Communities from "./communities/Communities";
import Community from "./community/Community";
import { BrowserRouter as Router,Route,Routes  } from "react-router-dom";
import Game from "./game/Game";
import NewCommunity from "./new-community/NewCommunity";

function App(){
  const [games,setGames]=useState([])
  
  useEffect(()=>{
    async function func(){
      const {data}= await axios.get("/home");
      setGames(data);
    }
    func();
    
  },[])
  return (
    <>
    <main>
      <Navbar></Navbar>
      <Router>
      <Routes>
        <Route path='/' element={<Cards games={games}/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login  />} />
        <Route path='/blogs' element={<Blogs  />} />
        <Route path='/blogs/new' element={<NewBlog />} />
        <Route path='/blogs/:id' element={<Blog  />} />
        <Route path='/communities' element={<Communities  />} />
        <Route path='/communities/new' element={<NewCommunity  />} />
        <Route path='/communities/:id' element={<Community />} />
        <Route path='/:id' element={<Game />} />   
      </Routes>
      </Router>
    </main>
    </>
  )
}
export default App