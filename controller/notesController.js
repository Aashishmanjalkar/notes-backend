const asyncHandler = require("express-async-handler");

const Notes = require("../models/notesModel");

//@desc get all the notes
const getNotes = asyncHandler (async(req,res) => {
    const notes = await Notes.find();
    res.status(200).json(notes);
});

//@desc Add a note
const addNote = asyncHandler(async (req,res) => {
    const {Title,Note} = req.body;
    const note = await Notes.create({
        Title,
        Note
    });
    res.status(200).json(note);
});


module.exports = {getNotes,addNote};