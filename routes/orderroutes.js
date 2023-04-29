const express = require("express");
const {OrderModel} = require("../modules/OrderModel.js");
const { UserModel } = require("../modules/usermodel.js");
const { RestaurantModel } = require("../modules/restaurantmodel.js");
const order = express.Router();

order.get("/",async(req,res)=>{
   let orders = await OrderModel.find();
   res.send(orders);
})


order.post("/",async(req,res)=>{
    let { restaurant,items,totalprice,deliveryAddress} = req.body;
    let ID = req.body.UserID;
    let User  = await UserModel.findOne({_id:ID});
    let Restaurant = await RestaurantModel.findOne({_id:restaurant});
    try {
        let neworder = await OrderModel({user:{userid:ID,ref:User},restaurant:{resid:restaurant,ref:Restaurant},items,totalprice,deliveryAddress,status:"Panding"});
        await neworder.save();
        res.send("new Order placed sucessfully!");
    } catch (error) {
        console.log(error);
    }
})

order.patch("/:id",async()=>{
    
})
module.exports={order};