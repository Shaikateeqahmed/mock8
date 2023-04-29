const express = require("express");
const { RestaurantModel } = require("../modules/restaurantmodel");
const { MenuModel} = require("../modules/menumodel.js");
const restaurant = express.Router();

restaurant.get("/",async(req,res)=>{
    try {
        let rest = await RestaurantModel.find();
        res.send(rest);
    } catch (error) {
        console.log(error);
    }
})
restaurant.get("/:id",async(req,res)=>{
    try {
        let ID = req.params.id;
        let rest = await RestaurantModel.findOne({_id:ID});
        res.send(rest);
    } catch (error) {
        console.log(error);
    }
})

restaurant.get("/:id/menu",async(req,res)=>{
    try {
        let ID = req.params.id;
        let rest = await RestaurantModel.findOne({_id:ID});
        res.send(rest.menu);
    } catch (error) {
        console.log(error);
    }
})

restaurant.post("/:id/menu",async(req,res)=>{
    try {
        let ID = req.params.id;
        let rest = await RestaurantModel.findOne({_id:ID});
        let {name,desciption,price,image} = req.body;

        let newmenu = new MenuModel({name,desciption,price,image,UserID:req.body.UserID});
        // menu.push(newmenu);
        await newmenu.save();
        let menu2 = await MenuModel.find();
         console.log(menu2);
        let addnewmenu = await RestaurantModel.findByIdAndUpdate({_id:ID},{menu:menu2});
        res.send("New Menu added");

    } catch (error) {
        console.log(error);
    }
})

restaurant.delete("/:id/menu/:menuid",async(req,res)=>{
    try {
        let menuID = req.params.menuid;
        let ID = req.params.id;
        let rest = await RestaurantModel.findOne({_id:ID});
        let userid = rest.UserID;
         console.log(userid,req.body.UserID);
        // if(userid===req.body.UserID){
        //     await MenuModel.findByIdAndDelete({_id:menuID});
        //     let menu = await MenuModel.find();
        //     let addnewmenu = await RestaurantModel.findByIdAndUpdate({_id:ID},{menu:menu});
        //     res.send("Item successullfy deleted!")

        // }else{
        //     res.send("U are not authorized");
        // }

        await MenuModel.findByIdAndDelete({_id:menuID});
            let menu = await MenuModel.find();
            let addnewmenu = await RestaurantModel.findByIdAndUpdate({_id:ID},{menu:menu});
            res.send("Item successullfy deleted!")
       

    } catch (error) {
        console.log(error);
    }
})

restaurant.post("/addrestaurant",async(req,res)=>{
    let {name, address} = req.body;
    try {
        let newrestaurant = new RestaurantModel({name,address,menu:[]});
        await newrestaurant.save();
        res.send("New Restaurant added!");
    } catch (error) {
        console.log(error);
    }
})


module.exports={restaurant};