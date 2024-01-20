import React, { useState,useContext} from 'react'
import notecontext from "../context/notes/NoteContext";

const AddNote = (props) => {
    const context=useContext(notecontext);
    const {addnote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""});
    const handelClick=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showalert("Note added successfully","success");
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div>
      <div className="container my-3">
      <h1>Add a note</h1>
    
      <form>
  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input type="text" className="form-control my-2" id="title" name="title" value={note.title}  required onChange={onChange} placeholder="Enter title"/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Description</label>
    <input type="text" className="form-control my-2" onChange={onChange} id="description" value={note.description}required name="description" placeholder="description"/>
  </div>
  <div className="form-group">
    <label htmlFor="description">Tag/Content</label>
    <input type="text" className="form-control my-2" onChange={onChange} id="tag" value={note.tag} minLength={1} required name="tag" placeholder="tag"/>  
  </div>

  <button type="submit" disabled={note.title.length<5 || note.description.length<5 || note.tag.length<1} className="btn btn-primary"onClick={handelClick}>Submit</button>
</form>
</div>
    </div>
  )
}
export default AddNote
