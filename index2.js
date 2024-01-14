const express = require("express");
const app = express();
const env = require("dotenv").config();
const port = process.env.PORT || 3000;
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');

connectDB();
// var corsOptions = {
//     origin: 'http://localhost:3000/',
//     credentials: true,
//     optionsSuccessStatus: 200 // For legacy browser support
// }
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());//body-parser
app.use("/api/notes",require("./routes/notesRoute"));
app.use("/api/user",require("./routes/userRoute"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Port listening at ${port}`)
})

//Add After line no 7
// const session = require('express-session');
// const passport = require('passport');
// require('./auth');

// function isLoggedIn(req, res, next) {
//     req.user ? next() : res.sendStatus(401);
// }
  
// app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());
  
// app.get('/googleLogin', (req, res) => {
// res.send('<a href="/auth/google">Authenticate with Google</a>');
// });

// app.get('/auth/google',
// passport.authenticate('google', { scope: [ 'email', 'profile' ] }
// ));

// app.get( '/auth/google/callback',
// passport.authenticate( 'google', {
//     successRedirect: '/protected',
//     failureRedirect: '/auth/google/failure'
// })
// );

// app.get('/protected', isLoggedIn, (req, res) => {
// res.send(`Hello ${req.user.displayName}`);
// });

// app.get('/logout', (req, res) => {
// req.logout();
// req.session.destroy();
// res.send('Goodbye!');
// });

// app.get('/auth/google/failure', (req, res) => {
// res.send('Failed to authenticate..');
// });