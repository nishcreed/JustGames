import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import AddText from "./AddText";
import AddImg from "./AddImg";
import axios, { formToJSON } from "axios";
import './new-blog.css'
import Select from 'react-select';

export default function NewBlog(){
    const [txtCnt,setTxtCnt]=useState(0);
    const [imgCnt,setImgCnt]=useState(0);
    const [curr,setCurr]=useState(0);
    const [cont,setCont]=useState([]);
    const [options,setOptions]=useState([]);
    const [selGames,setSelGames]=useState([]);

    const navigate=useNavigate();

    useEffect(()=>{
        if(curr!=0){
            if(curr>0)
                setCont([...cont,<AddText txtCnt={txtCnt}></AddText>]);
            else if(curr<0)
                setCont([...cont,<AddImg imgCnt={imgCnt}></AddImg>]);
        }
        else{
            axios.get('https://justgamesbackend.onrender.com/blogs/new')
            .then((res)=>{
                setOptions(res.data);
            })  
            .catch((err)=>{
                console.log(err.response.data);
            })
        }
    },[curr])

    const textHandler =() =>{
        setTxtCnt(txtCnt+1);
        if(curr==0 || curr<0)
            setCurr(1);
        else
            setCurr(curr+1);
    }

    const imgHandler = () => {
        setImgCnt(imgCnt+1);
        if(curr==0 || curr>0)
            setCurr(-1);
        else
            setCurr(curr-1);
    }

    const handleGameSelect = (selOptions) => {
        setSelGames(selOptions);
    }

    const handleSubmit =(e) =>{
        e.preventDefault();
        const x=formToJSON(e.target);
        x.games=selGames;
        axios.post('https://justgamesbackend.onrender.com/blogs',x,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(res =>{
            navigate('/blogs');
        })
        .catch(err =>{
            console.log(err)
        })
    }

    return(
        <main className="new-blog-form">
            <form onSubmit={handleSubmit}>
            <div>
                <div className="form-group">
                    <label for="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" required />
                </div>

                <div classname="form-group">
                    <label>Blog to be added under</label>
                    <Select 
                        isMulti
                        options={options}
                        value={selGames}
                        onChange={handleGameSelect}
                        className="form-control"
                    />
                </div>
                {cont}
            </div>

            <div>
                {txtCnt<=4 && <button onClick={textHandler} className="btn btn-outline-light mt-3 mb-3" type="button" id="textbtn"  >Add textarea</button>}
                {imgCnt<=3 && <button onClick={imgHandler} className="btn btn-outline-light mt-3 mb-3" type="button" id="imgbtn" >Add image</button>}<br />
                <button className="btn btn-outline-light mt-2 mb-3" type="submit" id="post" >Post</button>
            </div>
            </form>
        </main>
    )
}