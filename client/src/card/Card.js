import React from "react";
import './card.css'

export default function Card({game}){

    return (
        <div key={game._id} className="card mx-auto">
        <img src={game.imglink} className="card-img-top" alt={`Image of ${game.name}`} />
        <div className="card-body bg-dark text-light">
            <h5 className="card-title">{game.name}</h5>
            <p className="card-text">
                <p>Released: {game.released}</p>
                <p>Rating: {game.rating}</p>
            </p>
            <a href={`/${game._id}`} className="btn btn-outline-light">Details</a>
        </div>
        </div>
        
    )
}