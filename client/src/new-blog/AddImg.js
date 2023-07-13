import { useState } from "react"

export default function AddImg({imgCnt}){
    const [prev,setPrev]=useState("")
    const handlePreview =(e) =>{
        setPrev(URL.createObjectURL(e.target.files[0]))
    }
    return (
    <>
        <div className="mt-2">
            {prev!='' && <img id='prev' src={prev} alt="" />}
            <input type="hidden" class="hidden" name={`hidden${imgCnt}`} value={`hidden${imgCnt}`}v />
        </div>
        <div className="form-group mt-2" >
            <label forName={`image${imgCnt}`} style={{cursor: 'pointer'}}>
            <img src="/image.png" alt="" height="40px" width="40px" />
            </label>
            <input onChange={handlePreview} id={`image${imgCnt}`} type="file" name={`image${imgCnt}`} />
        </div>
    </>
    )
}