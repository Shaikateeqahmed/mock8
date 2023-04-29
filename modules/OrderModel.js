const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({

	 user : {type:Object, userid: String, ref: Object },
	 restaurant : {type:Object, restid: String, ref: Object },
   items: [{
     name: String,
     price: Number,
     quantity: Number
   }],
   totalPrice: Number,
   deliveryAddress: {
     street: String,
     city: String,
     state: String,
     country: String,
     zip: String
   },
   status: String,
   UserID : String

})

const OrderModel = mongoose.model("order",orderSchema);

module.exports={OrderModel};