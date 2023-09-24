const express = require("express");
const router = express.Router();
const {getNote,getNotes,addNote,updateNote,deleteNote} = require("../controller/notesController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getNotes).post(addNote);
router.route("/:id").get(getNote).put(updateNote).delete(deleteNote);

module.exports = router;