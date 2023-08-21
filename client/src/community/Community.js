import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import './community.css'
import Message from "./Message";
import eventBus from './EventBus'
import { LogContext } from "../LogContext";

export default function Community(){
    
    const { id } = useParams();
    const [comm,setComm]=useState(null);
    const [msg,setMsg]=useState(null);
    const [replyMsg,setReplyMsg]=useState(null)
    const navigate=useNavigate();
    const {username} = useContext(LogContext);

    const formHandler = (e) =>{
        e.preventDefault();
        axios.post(`https://justgamesbackend.onrender.com/communities/${id}`,
        {'text':msg,
        'replyForName': (replyMsg!=null ? replyMsg.user.username : ''),
        'replyForText':(replyMsg!=null ? replyMsg.text : '')
        }
        )
        .then((res)=>{
            navigate(0);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        axios.get(`https://justgamesbackend.onrender.com/communities/${id}`)
        .then((res)=>{
            setComm(res.data);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    if(comm!=null){
        eventBus.on('reply',(data)=>{
            for(let i in comm.message){
                if(comm.message[i]._id==data.msgId){
                    setReplyMsg(comm.message[i]);
                    break;
                }
            }
        })
    }
    

    return (
        <main className='comm-view'>    
            <h1 className="comm-title">{ comm!=null && comm.title}</h1>
            {
                <div className="messages">
                    {   
                        comm!=null &&
                        comm.message!=undefined &&
                        comm.message.map((msg)=>{ 
                                return(
                                    <Message msg={msg}></Message>
                                )
                        })
                    }
                </div>
            }
            <form className='send-msg' onSubmit={formHandler}>
                {
                    replyMsg!=null
                    && replyMsg.user!=undefined &&
                    <div className='reply-msg-send'>
                        <div className="reply-username d-flex justify-content-between">
                            <span>{replyMsg.user.username}</span>
                            <span onClick={()=> {setReplyMsg('');}} aria-hidden="true" className="close ml-auto">&times;</span>
                        </div>
                        <div className="reply-text">
                            {replyMsg.text}
                        </div>
                    </div>
                }
                {!username && 
                    <span style={{color:'yellow',fontStyle:'italic',fontSize:'0.8rem'}}>Log in to send message</span>}
                <div id='send' className="input-group mb-3">
                    <input disabled={!username} name="text" onChange={(e)=>{setMsg(e.target.value)}} type="text" className="form-control bg-dark text-white" aria-label="Recipient's username" aria-describedby="button-addon2" />
                    <button className="btn btn-light" type="submit" id="button-addon2">Send</button>  
                </div>
            </form>
        </main>
    )
}