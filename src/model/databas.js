const mongoose = require("mongoose")
const dbjjj = "mongodb://localhost:27017/project4"
const db = "mongodb+srv://dbuser:eH5zEwOPtE0GLSiB@cluster0.o3dlyhi.mongodb.net/internproject?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose.connect(db,{
    useNewUrlParser :true,
    useUnifiedTopology : true,
}).then(()=>{
    console.log("Connection Successfull")
}).catch(()=>{
    console.log("No connection")
})