const express =require('express');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser=require('../middleware/getuser');
const Note=require('../models/Notes');
// ROUTE: 1 fetch all notes of user login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
   const notes=await Note.find({user: req.user.id});
    res.json(notes);
});

// ROUTE: 2 CREATE NOTES LOGIN REQUIRED
router.post('/addnote',fetchuser,[
    body('title','Title contain atleast 3 character').isLength({min: 3}),
    body('description','description contains at least three character').isLength({ min: 5 }),
],async (req,res)=>{
    const {title,description,tag}= req.body;
    const errors =  validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        const note=new Note({
            title,description,tag,user:req.user.id
        })
        const savedNote=await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error occured");
}
   
});
//ROUTE 3: Route to update an existing note using PUT "/api/notes/updatenote" . login required
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    try {
        
   
 const {title,description,tag}=req.body;
 const newNote={};
 if(title){newNote.title=title}
 if(description){newNote.description=description}
 if(tag){newNote.tag=tag}
 let note=await Note.findById(req.params.id);
 if(!note){return res.status(404).send("Not Found")}
 if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
 }
 note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true});
 res.json({note});
} catch (error) {
        res.status(500).send("internal server error");
}
});
// Route:4 delting an existing note using get request "/api/notes/delete"
router.delete('/delete/:id',fetchuser,async(req,res)=>{
    try {
    let note=await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("Not found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not Allowed");
    }
    let ans=await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({"success": "deleted"});
} catch (error) {
        res.status(500).send("Internal server error");
}
})
module.exports=router;