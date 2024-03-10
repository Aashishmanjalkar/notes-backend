const express = require("express");
const app = express();
const env = require("dotenv").config();
const port = process.env.PORT || 3000;
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());//body-parser
app.use("/api/notes",require("./routes/notesRoute"));
app.use("/api/user",require("./routes/userRoute"));
app.use(errorHandler);

app.get('/', (req,res) => {
    res.json("Hello");
});

app.listen(port,()=>{
    console.log(`Port listening at ${port}`)
})
