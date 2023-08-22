import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import './communities.css'
import { LogContext } from "../LogContext";

export default function Communities(){

    const [comms,setComms]=useState([]);
    const {username} = useContext(LogContext);
    useEffect(()=>{
        axios.get('https://justgamesbackend.onrender.com/communities',{withCredentials:true})
        .then((res)=>{
            setComms(res.data)
        })
        .catch((err)=>{

        })
    },[])
    return(
        <main id="comms-view">
        <h1 id='comms-heading'>Communities</h1>
        <div className="list-group">
        {
            comms.map((comm,ind)=>{
                return ind%2==0 ? 
                <a href={`communities/${comm._id}`} className='list-group-item list-group-item-dark d-flex justify-content-between'>
                {comm.title}
                </a> : 
                <a href={`communities/${comm._id}`} className='list-group-item list-group-item-light list-group-item-secondary d-flex justify-content-between'>
                {comm.title}
                </a>
            })
        }
        </div>
            {
                !username && <span> <span style={{color:'yellow',fontStyle:'italic',fontSize:'0.8rem'}}>Log in to create a community</span><br /></span>
            } 
            <a href='/communities/new' style={{pointerEvents:!username? 'none':''}} type="button" className="btn btn-outline-light mt-3 mb-3">Create Community</a>
        </main>
    )
}