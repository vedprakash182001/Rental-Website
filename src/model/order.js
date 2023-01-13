const mongoose = require("mongoose");
const validator = require("validator");

const Order = mongoose.Schema({
    username : String,
    productname: String,
    price:String,
    useremail:String,
    phonenumber: Number,
    date:String,
    orderid:String,
    Address:String,
})

module.exports = mongoose.model("order",Order);