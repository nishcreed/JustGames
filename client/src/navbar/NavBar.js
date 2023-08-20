import { useEffect,useState } from "react"
import axios from 'axios'
import './navbar.css'
import { useNavigate } from "react-router-dom";

export default function Navbar(){
    const navigate =useNavigate();

    const logout=() =>{
        axios.get('https://justgamesbackend.onrender.com/logout')
        .then((res)=>{
            localStorage.clear();
            setLog("");  
            navigate(0);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const [log,setLog]=useState(localStorage.getItem('username'));

    return (
        <>
            <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary"  data-bs-theme="dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">JustGames</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/blogs">Blogs</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/communities">Communities</a>
                    </li>
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0">
                    {   !log &&
                        <li className="nav-item ml-auto">
                        <a className="nav-link" href="/login">Login</a> 
                        </li> 
                    }
                    {
                        log &&
                        <li className="nav-item ml-auto">
                        <span className="nav-link">Hey, {log}</span>
                        </li>
                    }
                    {   log &&
                        <>
                        <li className="nav-item ml-auto">
                        <a className="nav-link" onClick={logout} >Logout</a> 
                        
                        </li> 
                        </>
                    }
                    {   !log &&
                        <li className="nav-item ml-auto">
                        <a className="nav-link" href="/register">Register</a>
                        </li>
                    }
                </ul>
                </div>
            </div>
            </nav>
      </>
    )
}