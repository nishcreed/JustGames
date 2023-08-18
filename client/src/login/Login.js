import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'


export default function Login(){

    const navigate=useNavigate();
    const [err,setErr]=useState(false);

    function handleSubmit(accnt){  
        axios.post('https://justgamesbackend.onrender.com/login',accnt)
        .then((res)=>{
            setErr(false);
            localStorage.setItem("username",accnt.username)
            navigate(-1)    
        })
        .catch(err=>{
            console.log(err.response.data)
            setErr(true)
        })   
    }

    const [accnt,setAccnt]=useState({
        username:"",
        password:""
    })
    return(
        <div className="login-form bg-dark text-white">
            <form onSubmit={(e)=>{e.preventDefault(); handleSubmit(accnt); }}>
            <div className="form-group">
                <label  htmlFor="username">Username</label>
                <input onChange={(e)=>setAccnt({...accnt,username:e.target.value})} type="text" className="form-control" id="username" placeholder="Enter username" />
            </div>
            <div className="form-group">
                <label  htmlFor="password">Password</label>
                <input onChange={(e)=>setAccnt({...accnt,password:e.target.value})} type="password" className="form-control" id="password" placeholder=" Enter password" />
            </div>
            
            <button type="submit" className="btn btn-outline-light">Log In</button>
            <br />
            {err && <span style={{color:'red',fontSize:'0.8rem',fontStyle:'italic'}} >Incorrect Credentials</span>}
            </form>
        </div>
    )
}