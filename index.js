const express = require("express");
const app = express();
const env = require("dotenv").config();
const port = process.env.PORT || 3000;
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

connectDB();
app.use(express.json());//body-parser
app.use("/api/notes",require("./routes/notesRoute"));
app.use("/api/user",require("./routes/userRoute"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Port listening at ${port}`)
})