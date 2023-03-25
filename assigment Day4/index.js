const express = require('express')
const moment = require('moment')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('./middlewares/auth')
const PORT = process.env.PORT || 5000 ;
const TOKEN_KEY =process.env.TOKEN_KEY || "norhan"
const app = express();
app.use(express.json())

const User = require("./models/user");

// Register
app.post("/register",async (req, res) => {
    try {
        // Get user input
        const { firstname, lastname, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && firstname && lastname)) {
             res.status(400).send("All input is required");
            // console.log("error")
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
            firstname,
            lastname,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          TOKEN_KEY
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
});

// Login
app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            TOKEN_KEY
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
});

app.use("/Welcome",auth , (req,res) => {
    res.status(200).send("Welcome ")
});

const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/userAndposts",(err)=>
{
    if(!err) return console.log("databases connect successfuly");
    console.log(err)
})

app.listen(PORT,(err)=>{
    if(!err) return console.log("server connect successfuly");
    console.log(err) 
})
