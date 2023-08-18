import { useEffect, useState } from 'react'
import './blogs.css'
import axios from 'axios'
export default function Blogs(){

    const [blogs,setBlogs]=useState([])
    useEffect(()=>{
        axios.get('https://justgamesbackend.onrender.com/blogs')
        .then((res)=>{
            setBlogs(res.data)
        })
        .catch((err)=>{

        })
    },[])

    return(
        <main id='blogs-view'>
            <h1 id="blogs-heading">Blogs</h1>
            <div className="list-group">
            {
            blogs.map((blog,ind)=>{
                return ind%2==0 ? 
                <a href={`blogs/${blog._id}`} className='list-group-item list-group-item-dark d-flex justify-content-between'>
                {blog.title} <span className='ml-auto'>-{blog.user.username}</span>
                </a> : 
                <a href={`blogs/${blog._id}`} className='list-group-item list-group-item-light list-group-item-secondary d-flex justify-content-between'>
                {blog.title} <span className='ml-auto'>-{blog.user.username}</span>
                </a>
            })}
            </div>
            {
                localStorage.getItem('username')==undefined && <span> <span style={{color:'yellow',fontStyle:'italic',fontSize:'0.8rem'}}>Log in to create a blog</span><br /></span>
            } 
            <a href='/blogs/new' style={{pointerEvents:localStorage.getItem('username')==undefined? 'none':''}} type="button" className="btn btn-outline-light mt-3 mb-3">Post Blog</a>
                   
        </main>

    )
}