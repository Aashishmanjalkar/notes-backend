const asyncHandler = require("express-async-handler");

const Notes = require("../models/notesModel");

//@desc get all the notes
// @route Get /api/notes
const getNotes = asyncHandler (async(req,res) => {
    const notes = await Notes.find();
    res.status(200).json(notes);
});

//@desc get note
//@route Get /api/notes/:id
const getNote = asyncHandler(async(req,res) => {
    const note = await Notes.findById(req.params.id);
    res.status(200).json(note);
});

//@desc Add a note
// @route Post /api/notes
const addNote = asyncHandler(async (req,res) => {
    const {title,note} = req.body;
    console.log("REquest " + JSON.stringify(req.user));
    const data = await Notes.create({
        title,
        note,
        user_id:req.user.id
    });
    res.status(200).json(data);
});

// @desc Update contact
// @route Put /api/notes/:id
const updateNote = asyncHandler(async(req,res) => {
    const findNote = await Notes.findById(req.params.id);
    if(!findNote){
        res.status(400);
        throw new Error("Note not found");
    }
    if(findNote.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have a access");
    }
    const updatedNote = await Notes.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true},
    )
    res.status(200).json(updatedNote);
});

//desc Delete Note
//@route Post /api/notes/:id
const deleteNote = asyncHandler(async(req,res) => {
    const findNote = await Notes.findById(req.params.id);
    if(!findNote){
        res.status(400);
        throw new Error("Note not found")
    }
    if(findNote.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have access");
    }
    await findNote.deleteOne();
    res.status(200).json(findNote);
});
module.exports = {getNote,getNotes,addNote,updateNote,deleteNote};