import axios from 'axios'
import './navbar.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LogContext } from "../LogContext";

export default function Navbar(){
    const navigate = useNavigate();
    const location = useLocation();
    const {username,setUsername } = useContext(LogContext);
    const log = username;

    const logout=() =>{
        axios.get('https://justgamesbackend.onrender.com/logout',{withCredentials:true})
        .then((res)=>{
            localStorage.removeItem('username');
            setUsername(null);
            navigate('/');
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    
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
                    <Link className="nav-link active" aria-current="page" to={'/'}>Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={'/blogs'}>Blogs</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to={'/communities'}>Communities</Link>
                    </li>
                </ul>
                <ul className="navbar-nav mb-2 mb-lg-0">
                    {   !log &&
                        <li className="nav-item ml-auto">
                        <Link className="nav-link" onClick={(e)=>{e.preventDefault();localStorage.setItem('prev',location.pathname);navigate('/login')}} to={'/login'}>Login</Link>
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
                        <Link className="nav-link" onClick={logout}>Logout</Link>
                        </li> 
                        </>
                    }
                    {   !log &&
                        <li className="nav-item ml-auto">
                        <Link className="nav-link" to={'/register'} >Register</Link>
                        </li>
                    }
                </ul>
                </div>
            </div>
            </nav>
      </>
    )
}