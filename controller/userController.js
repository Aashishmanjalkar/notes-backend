const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//@desc register user
//@route /api/register
const registerUser = asyncHandler( async(req,res) => {
    const {userName,email,password} = req.body;
    if(!userName || !email || !password ){
        res.status(405);
        throw new Error("All feilds are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    //Hash password
    const hashPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        userName,
        email,
        password:hashPassword
    })
    if(user){
        const accessToken = jwt.sign({
            user:{
                userName:user.userName,
                email:user.email,
                id:user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"20m"}
        );

        res.status(200).json({accessToken});
        // res.status(201).json({_id:user.id,email:user.email})
    }else{
        res.status(400);
        throw new Error("Something went wrong");
    }
    res.json({message:"registered successfully"});
});

//@desc login user
//@route POST /api/user
const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    if(!email ||!password ){
        res.status(400);
        throw new Error("All feilds are mandatory");
    }
    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        res.status(401);
        throw new Error("Invalid password");
    }
    const accessToken = jwt.sign({
        user:{
            userName:user.userName,
            email:user.email,
            id:user.id
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:"20d"}
    );

    res.status(200).json({accessToken});
});

//@desc logout user
const logoutUser = asyncHandler(async(req,res) => {

});

module.exports = {registerUser,loginUser,logoutUser};
