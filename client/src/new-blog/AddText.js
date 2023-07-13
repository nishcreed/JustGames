export default function AddText({txtCnt}){
    return(
        <div className="form-group">
            <label forName="text">Textarea</label>
            <textarea className="form-control" id="text" rows="3" name={`text${txtCnt}`}></textarea>
        </div>
    )
}