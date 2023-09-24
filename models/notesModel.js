const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
    },
    note:{
        type:String,
        required:[true,"Note is required"],
    }
},{
    timestamps:true,
});

module.exports = mongoose.model("Notes",notesSchema);