import './message.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import eventBus from './EventBus'
import { LogContext } from '../LogContext';
import { useContext } from 'react';


export default function Message({msg}){

    const {id} = useParams();
    const navigate =useNavigate(0);
    const {username} = useContext(LogContext);

    const replyHandler = (msgId) =>{
        eventBus.dispatch('reply',{msgId:msgId});
    }

    const delMsg =(msgId) =>{
        axios.put(`https://justgamesbackend.onrender.com/communities/${id}/msg`,{msgId:msgId})
        .then((res)=>{
            navigate(0);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div className="message">
            {   msg.replyForName && msg.replyForText &&
                <div className='reply-msg bg-dark'>
                    <div className="reply-username">
                        {msg.replyForName}
                    </div>
                    <div className="reply-text">
                        {msg.replyForText}
                    </div>
                </div>
            }
            <div className='msg bg-dark'>
                <div className="sent-username d-flex justify-content-between">
                    {msg.user && msg.user.username}
                    <span className="ml-auto">
                        <span onClick={()=> replyHandler(msg._id)}>
                            <svg className='reply-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-reply" viewBox="0 0 16 16">
                            <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"/>
                            </svg>
                        </span>
                        { username==msg.user.username && 
                            <span onClick={()=>delMsg(msg._id)} style={{marginLeft:'8px'}}>
                                <svg className='delete-svg' id='delete' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                            </span>
                        }
                    </span>
                    
                </div>
                <div>
                    {msg.text}
                </div>
            </div>
        </div>
    )

}