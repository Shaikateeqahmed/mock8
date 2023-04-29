const mongoose = require("mongoose");
const resSchema = mongoose.Schema({
    name : String,
    address : {
        street : String,
        city : String,
        state : String,
        country : String,
        zip : String
    },
    menu : Array
})

const RestaurantModel = mongoose.model("Restaurant",resSchema);

module.exports = {RestaurantModel};