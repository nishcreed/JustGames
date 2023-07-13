import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function NewCommunity(){

    const [title,setTitle]=useState(null);
    const navigate=useNavigate();

    const formHandler = (e) => {
        e.preventDefault();
        axios.post('/communities',{title:title})
        .then((res)=>{
            navigate('/communities');
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <form style={{width:'50%',margin:'0 auto'}}>
            <div className="form-group" >
                <label>Enter a title</label>
                <input name='title' onChange={(e)=>{setTitle(e.target.value)}} className="form-control bg-dark text-white" />
            </div>
            <button onClick={formHandler} className="btn btn-outline-light">Create</button>
        </form>
    )

}