
import React, { useContext, useEffect,useRef,useState } from 'react'
import notecontext from "../context/notes/NoteContext";
import Notesitem from './Notesitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const context = useContext(notecontext);
  const { notes, getNotes,editnote} = context;
  let navigate=useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login');
    }
    
  }, [])
  const updatenote = (currentnote) => {
      ref.current.click();
      setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
  }
  const ref=useRef(null);
  const refClose=useRef(null);
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});
  const handelClick=(id)=>{
    console.log(id);
    // e.preventDefault();
    refClose.current.click()
    editnote(note.etitle,note.edescription,note.etag,note.id);
    props.showalert("Note updated successfully","success");
}
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value});
}

  return (
    <div>
      <AddNote showalert={props.showalert} />
      
      <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

  
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <div className="container my-3">
      <h3>Add a note</h3>
    
      <form>
  <div className="form-group">
    <label htmlFor="etitle">Email address</label>
    <input type="text" className="form-control my-2" id="etitle" name="etitle"  required value={note.etitle} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="edescription">Password</label>
    <input type="text" className="form-control my-2" onChange={onChange} id="edescription"  required value={note.edescription} name="edescription" placeholder="description"/>
  </div>
  <div className="form-group">
    <label htmlFor="edescription">Password</label>
    <input type="text" className="form-control my-2" onChange={onChange} id="etag" value={note.etag}  required name="etag" placeholder="tag"/>
  </div>

  
</form>
</div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handelClick} disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary">Update</button>
            </div>
          </div>
        </div>
      </div> 
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
        {notes.length===0 && "No notes to diplay" }
        </div>
        {notes.map((note) => {
          return <Notesitem key={note._id} updatenote={updatenote} notes={note} />;
        })}
      </div>
    </div>
  )
}

export default Notes
