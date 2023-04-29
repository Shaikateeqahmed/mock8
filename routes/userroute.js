const express = require("express");
const {UserModel} = require("../modules/usermodel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = express.Router();
require("dotenv").config();

user.get("/",async(req,res)=>{
res.send("user page");
})

user.post("/register",async(req,res)=>{
    const {name, email, password,address} = req.body;
    console.log(req.body);
    let user = await UserModel.find({email});
    if(user.length>0){
        res.send("User With this Email Already Exist!");
    }else{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log(err);
            }else{
                let newuser = new UserModel({name,email,password:hash,address});
                await newuser.save();
                res.send("user Register Successfully!");
            }
        })
    }
})

user.post("/login",async(req,res)=>{
    const {email, password} = req.body;
    let user = await UserModel.find({email});
    if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(err){
                res.send("Invalid Crediantials!");
            }else{
                let token = jwt.sign({UserID:user[0]._id},process.env.key);
                res.send(token);
            }
        })
    }else{
        res.send("Please Signup First!");
    }
})

user.patch("/:id/reset",async(req,res)=>{
    let {password, newpassword} = req.body;
    let ID = req.params.id;
    // console.log(payload,ID);
    try {
        bcrypt.hash(newpassword,5,async(err,hash)=>{
            if(err){
                console.log(err);
            }else{
                await UserModel.findByIdAndUpdate({_id:ID},{password:hash});
                res.send("Password Updated Successfully!");
            }
        })
      
    } catch (error) {
        console.log(err);
    }
})


module.exports={user};