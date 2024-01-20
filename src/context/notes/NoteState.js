
import { useState } from "react";
import NoteContext from "./NoteContext";

const noteinitial=[]
const NoteState=(props)=>{
  const host="http://localhost:5000"
    const [notes,setNotes]=useState(noteinitial);
    // get all notes
    const getNotes=async ()=>{
      const url=`${host}/api/notes/fetchallnotes`;
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
       
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
     
      });
      
      const json =await response.json();
      setNotes(json)
      // console.log(json);
    }
    // adding note
    const addnote=async (title,description,tag)=>{
      const url=`${host}/api/notes/addnote`;
      const response = await fetch(url, {
        method: "POST",
       
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        
        body: JSON.stringify({title,description,tag})
      });
      
      const note=await response.json();
      setNotes(notes.concat(note));
      // console.log(notes);
    }
    
    
    const editnote=async (title,description,tag,id)=>{
      
       const url=`${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
       
          body: JSON.stringify({title,description,tag}), 
        });
        // console.log(response);
        // parses JSON response into native JavaScript objects
        const newNotes=JSON.parse(JSON.stringify(notes))
        for (let i = 0; i < newNotes.length; i++) {
          if(newNotes[i]._id===id){
            newNotes[i].title=title;
            newNotes[i].description=description;
            newNotes[i].tag=tag;
            break;
          }
          // console.log(newNotes);
          setNotes(newNotes);
      }
      }
    // delete note
    const deletenote=async (id)=>{
        // console.log("you are deleting node with id : "+ id);
        const newNotes=notes.filter((notes)=>{return notes._id!==id});
        const url=`${host}/api/notes/delete/${id}`;
        const response = await fetch(url, {
          method: "DELETE", 
         
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
       
          
        });
        // console.log(response);
        setNotes(newNotes);
    }
    return (
    <NoteContext.Provider value={{notes,addnote,editnote,deletenote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}
export default NoteState;