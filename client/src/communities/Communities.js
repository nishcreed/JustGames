import { useEffect, useState } from "react"
import axios from 'axios'
import './communities.css'

export default function Communities(){

    const [comms,setComms]=useState([])
    useEffect(()=>{
        axios.get('https://justgamesbackend.onrender.com/communities')
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
                <a href={`communities/${comm._id}`} className='list-group-item list-group-item-action d-flex justify-content-between'>
                {comm.title}
                </a> : 
                <a href={`communities/${comm._id}`} className='list-group-item list-group-item-action list-group-item-secondary d-flex justify-content-between'>
                {comm.title}
                </a>
            })
        }
        </div>
            {
                sessionStorage.getItem('username')==undefined && <span> <span style={{color:'yellow',fontStyle:'italic',fontSize:'0.8rem'}}>Log in to create a community</span><br /></span>
            } 
            <a href='/communities/new' disabled={sessionStorage.getItem('username')==undefined} type="button" className="btn btn-outline-light mt-3 mb-3">Create Community</a>
        </main>
    )
}