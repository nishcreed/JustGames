import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'


export default function Register(){

    const navigate=useNavigate()
    function handleSubmit(accnt){  
        axios.post('https://justgamesbackend.onrender.com/register',accnt)
        .then((res)=>{
            navigate('/')
        })
        .catch(err=>{
            console.log(err.response.data)
        })    
    }

    const [accnt,setAccnt]=useState({
        email:"",
        username:"",
        password:""
    })
    return(
        <div className="reg-form bg-dark text-white">
            <form onSubmit={(e)=>{e.preventDefault(); handleSubmit(accnt); }}>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input onChange={(e)=>setAccnt({...accnt,email:e.target.value})} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
                <label  htmlFor="username">Username</label>
                <input onChange={(e)=>setAccnt({...accnt,username:e.target.value})} type="text" className="form-control" id="username" placeholder="Enter username" />
            </div>
            <div className="form-group">
                <label  htmlFor="password">Password</label>
                <input onChange={(e)=>setAccnt({...accnt,password:e.target.value})} type="password" className="form-control" id="password" placeholder=" Enter password" />
            </div>
            
            <button type="submit" className="btn btn-outline-light">Register</button>
            </form>
        </div>
    )
}