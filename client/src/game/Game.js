import { useEffect, useState } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"
import './game.css'

export default function Game(){
    const {id} = useParams();
    const [game,setGame]=useState({});
    useEffect(()=>{
        axios.get(`https://justgamesbackend.onrender.com/${id}`,{withCredentials:true})
        .then((res)=>{
            setGame(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    return (
        <main className='game'>
            <h1 className="game-heading">{game.name}</h1>
            <section className="game-content">
                <div className="game-left">
                    <div id="overview">
                        <h2>Overview</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac tortor vitae purus faucibus ornare suspendisse sed. Eget nunc scelerisque viverra mauris in aliquam. Dignissim sodales ut eu sem integer vitae justo. Iaculis at erat pellentesque adipiscing commodo elit at. Diam in arcu cursus euismod quis viverra nibh cras. Aliquet sagittis id consectetur purus ut faucibus pulvinar elementum integer. Lectus vestibulum mattis ullamcorper velit. Fames ac turpis egestas integer eget. Viverra orci sagittis eu volutpat odio facilisis mauris sit. Metus vulputate eu scelerisque felis imperdiet.</p>
                    </div>
                    <div className="subsection">
                        <div id="platforms">
                            <h3>Platforms:</h3>
                            <p>
                                {game.platforms && game.platforms.map((p)=>{
                                return <span className="badge bg-secondary">{p.name}</span>
                                })}
                            </p>
                        </div>
                        <div id="genres">
                        <h3>Genres:</h3>
                            <p>
                                {game.genres && game.genres.map((genre)=>{
                                    return <span className="badge bg-secondary">{genre.name}</span>
                                })}
                            </p>
                        </div>
                    </div>
                    <div id="tags">
                    <h3>Tags:</h3>
                        <p>
                            {game.tags && game.tags.map((tag)=>{
                                return <span className="badge bg-secondary">{tag.name}</span>
                            })}
                        </p>
                    </div>
                </div>
                <div className="game-right">
                    <p className="p-img"><img id='game-img' src={game.imglink} /></p>
                    <div className="subsection mt-3">
                        <div id="rel-date">
                            <h3>Release Date:</h3> {game.released}
                        </div>
                        <div id="rat-count">
                            <h4>Metacritic:</h4> {game.metacritic}
                        </div>
                    </div>
                    <div className="subsection mt-3">
                        <div id="rating">
                            <h4>Rating:</h4> {game.rating}
                        </div>
                        <div id="rat-count">
                            <h4>Ratings Count:</h4> {game.ratings_count}
                        </div>
                    </div>
                    <div className="subsec mt-3">
                        <h4>Ratings:</h4>
                        {game.ratings && game.ratings.map((rating)=>{
                            return <span className="badge bg-secondary">{rating.title}<span className="badge text-bg-dark">{rating.count}</span></span>
                        })}
                    </div>
                </div>
            </section>
            <section className="game-content"><h2>Blogs</h2></section>
            <section className="game-content">
                <div className="sub-game-left">
                    <ul>
                    {game.blogs && game.blogs.map((blog,ind)=>{
                        return ind<=game.blogs.length/2 && <li><h5><a href={`blogs/${blog._id}`}>{blog.title}</a></h5></li>
                    })}
                    </ul>
                </div>
                <div className="sub-game-right">
                    <ul>
                    {game.blogs && game.blogs.map((blog,ind)=>{
                        return ind>game.blogs.length/2 && <li><h5><a href={`blogs/${blog._id}`}>{blog.title}</a></h5></li>
                    })}
                    </ul>
                </div>
            </section>
        </main>
    )
}