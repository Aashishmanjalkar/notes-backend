const express = require("express");
const router = express.Router();
const {getNotes,addNote} = require("../controller/notesController");

router.route("/").get(getNotes).post(addNote);


module.exports = router;