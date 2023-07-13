import { useEffect, useState } from "react";
import Card from "../card/Card"
import Select from 'react-select';
import './cards.css'

export default function Cards({games}){

    const [selGameObject,setSelGameObject]=useState(null);

    const handleGameSearch = (selOption) => {
        setSelGameObject(selOption);
    }

    return (
        <>
            <div id='home-search' classname="form-group">
                <Select 
                    options={games}
                    value={selGameObject}
                    onChange={handleGameSearch}
                    isClearable
                    className="form-control"
                />
            </div>


            <div className="container text-center">
                <div className="row">
                    {
                        selGameObject!=null && 
                        <div className="mb-3 col-xs-12 col-sm-6 col-md-6 col-xl-3 col-lg-4 ">
                            <Card game={selGameObject.value}></Card>
                        </div>
                        ||
                        selGameObject==null &&
                        games && games.map(game => {
                            return(
                                <div className="mb-3 col-xs-12 col-sm-6 col-md-6 col-xl-3 col-lg-4 ">
                                    {game.value && <Card game={game.value}></Card>}
                                </div>
                            )
                        })
                    }
                </div>    
            </div>
        </>
    )
}