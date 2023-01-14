require("dotenv").config()

const express = require("express");
const app = express();
const port = process.env.PORT|4500
const bodyParse = require("body-parser")
const hbs = require("hbs")

// require("./model/databas");
const Order = require("./model/order");

app.use("/statics",express.static("public"))

app.set("view engine","hbs");
app.set("views","views")
hbs.registerPartials("views/partials")

app.use(bodyParse.urlencoded({
    extended:true
}))


const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

var username1 = "";
var productname1=""
var price1=""
var useremail1=""
var phonenumber1=""
var date1=""
var orderid1=""
var Address1=""

app.post("/payment", async (req, res) => {
    try {
        username1 = req.body.username
        productname1=req.body.productname
        price1=req.body.price
        useremail1=req.body.useremail
        phonenumber1=req.body.usernumber
        date1=req.body.date
        orderid1=req.body.orderid
        Address1=req.body.Address
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [({
                price_data: {
                currency: "inr",
                product_data: {
                    name: req.body.productname,
                },
                unit_amount_decimal: Number(req.body.price)*100,
                },
                quantity: 1,
            
        })],
        success_url: `${process.env.CLIENT_URL}/success`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
        })
        res.render("newp",{
            link:session.url
        })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.get("/success",async(req,res)=>{
    try {
        // const data = await Order.create({
        //     username:username1,
        //     productname:productname1,
        //     price:price1,
        //     useremail:useremail1,
        //     phonenumber:phonenumber1,
        //     date:date1,
        //     orderid:orderid1,
        //     Address:Address1
        // })
        // data.save();
        res.render("success");
    } catch (err) {
        res.send(err)
    }
})

app.get("/cancel",(req,res)=>{
    res.render("cancel");
})



app.get("",(req,res)=>{
    res.render("index");
})

app.get("/user_detail",(req,res)=>{
    res.render("user")
})

app.post("/cash",async(req,res)=>{
    try {
        // const data = await Order.create({
        //     username:req.body.username,
        //     productname:req.body.productname,
        //     price:req.body.price,
        //     useremail:req.body.useremail,
        //     phonenumber:req.body.usernumber,
        //     date:req.body.date,
        //     orderid:req.body.orderid,
        //     Address:req.body.Address
        // })
        // data.save();
        res.render("success");
    } catch (err) {
        res.send(err)
    }
})


app.post("/make_payment",(req,res)=>{
    const data = req.body;
    res.render("payment",{
        detail : data,
    })
})



app.listen(port,()=>{
    console.log(`Surver is running at ${port}`)
})