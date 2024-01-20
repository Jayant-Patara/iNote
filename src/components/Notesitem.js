import React, { useContext } from 'react'
import notecontext  from "../context/notes/NoteContext";
const Notesitem = (props) => {
  const context=useContext(notecontext);
  const {deletenote}=context;
    const {notes,updatenote}=props;
  return (
    <div className="col-md-3 my-3">
      <div className="card" >

  <div className="card-body">
    <h5 className="card-title">{notes.title}</h5>
    <p className="card-text">{notes.description}</p>
    <i className="fa-regular fa-trash-can mx-2" onClick={()=>{
      deletenote(notes._id);
    }}></i>
    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updatenote(notes)}}></i>
  </div>
</div>
    </div>
  )
}

export default Notesitem
