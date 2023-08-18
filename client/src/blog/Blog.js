import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios'
import './blog.css'
export default function Blog(){
    let { id } = useParams();
    const [blog,setBlog]=useState({});
    const navigate =useNavigate();

    useEffect(()=>{
        axios.get(`https://justgamesbackend.onrender.com/blogs/${id}`)
        .then((res)=>{
            setBlog(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    const formHandler =() =>{
        axios.delete(`https://justgamesbackend.onrender.com/blogs/${id}`)
        .then((res)=>{
            navigate(-1);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <>
        {   blog!=undefined &&
            <main className="blog-view">
                <h1 className="blog-title">{blog.blog!=undefined && blog.blog.title}</h1>
                <h3 className="author">-{blog.username!=undefined && blog.username}</h3>
                <div className="blog-body">
                {
                    blog.blog!=undefined &&
                    blog.blog.body.map((content)=>{
                        return(
                            <>
                                {content.text.map((text)=>{
                                    return(
                                        <div className="blog-text">
                                            {text}
                                        </div>
                                    )
                                })}
                                
                                {content.image!="" && <img className="blog-image" src={content.image} />}
                            </>
                        )
                    })
                }
                </div>
                { localStorage.getItem('username')==blog.username && 
                <form onSubmit={formHandler} >
                    <button type="submit" className="btn btn-outline-light mt-3">Delete</button> 
                </form>
                }
            </main>
        }
        </>
    )
}