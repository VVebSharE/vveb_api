const jwt =require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Project = require("../models/projectModel");

// @desc Register new user
// @route  POST /api/users
// @access Public
const registerUser =asyncHandler( async (req,res)=>{
    const {name,uid,password}=req.body
    if(!name || !uid || !password){
        res.status(400) 
        throw new Error('Please add all fields')
    }

    //Check if user Exists
    const userExists = await User.findOne({uid})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // Has password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)


    // Create user
    const user = await User.create({
        name,
        uid,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            uid: user.uid,
            token:generateToken(user._id) 
        })
    } else{
        res.status(400)
        throw new Error('Invalid User data')
    }
})

// @desc Authenticate a user
// @route  POST /api/users/login
// @access Public
const loginUser =asyncHandler(async (req,res)=>{
    const {uid,password} = req.body

    const user = await User.findOne({uid})
    
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            uid: user.uid,
            token:generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get user data
// @route  GET /api/users/me
// @access Private
const getMe =asyncHandler(async (req,res)=>{
    res.status(200).json(req.user)
})

// @desc Get user data  (public)
// @route  POST /api/users/data
// @access 
const userData =asyncHandler(async (req,res)=>{
    const {uid} = req.body
    if(!uid){
        res.status(400) 
        throw new Error('Please provide user id')
    }

    const user = await User.findOne({uid})
    const projects = await Project.find({ user:user.id });

    if(user){
        res.status(200)
        res.json({
            name:user.name,
            uid:user.uid,
            projects:projects,
        })
    }
    else{
        res.status(400)
        throw new Error('User not exist')
    }

})

// Generate JWT
const generateToken =(id)=>{
    return jwt.sign({id }, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}

module.exports={
    registerUser,
    loginUser,
    getMe,
    userData,
}