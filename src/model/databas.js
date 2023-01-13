const mongoose = require("mongoose")
const db = "mongodb://localhost:27017/project4"
mongoose.connect("mongodb://localhost:27017/project4",{
    useNewUrlParser :true,
}).then(()=>{
    console.log("Connection Successfull")
}).catch(()=>{
    console.log("No connection")
})