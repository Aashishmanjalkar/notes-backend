const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    Title:{
        type:String,
    },
    Note:{
        type:String,
        required:[true,"Note is required"],
    }
},{
    timestamps:true,
});

module.exports = mongoose.model("Notes",notesSchema);