const express = require("express");
const {connection} = require("./config/connection.js");
const {user} = require('./routes/userroute.js');
const {authentication} = require("./middlewares/authenticaiton.js");
const { restaurant } = require("./routes/restaurantroute.js");
const { order } = require("./routes/orderroutes.js");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/user",user);
app.use(authentication);
app.use("/restaurants",restaurant);
app.use("/orders",order);



app.listen(process.env.port, async()=>{
    await connection;
    console.log(`Server is running on port 3000`);
})