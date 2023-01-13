const express = require("express");
const app = express();
const port = process.env.PORT|8000
const bodyParse = require("body-parser")
const hbs = require("hbs")
const paytm = require("paytmchecksum");


require("./model/databas");
const Order = require("./model/order");

// app.use("statics",express.static("public"))
app.use("/statics",express.static("public"))

app.set("view engine","hbs");
app.set("views","views")
hbs.registerPartials("views/partials")

app.use(bodyParse.urlencoded({
    extended:true
}))

const publish_key = "pk_test_F5UFRy9rcym7iLRTtaH55jGu"
const Secret_Key = "sk_test_Czcmd6nNU3pu0sUjKGT3TYAf"

const stripe = require('stripe')(Secret_Key)

app.get("",(req,res)=>{
    res.render("index");
})

app.get("/user_detail",(req,res)=>{
    res.render("user")
})

app.post("/cash",async(req,res)=>{
    try {
        const data = await Order.create({
            username:req.body.username,
            productname:req.body.productname,
            price:req.body.price,
            useremail:req.body.useremail,
            phonenumber:req.body.usernumber,
            date:req.body.date,
            orderid:req.body.orderid,
            Address:req.body.Address
        })
        data.save();
        res.render("cod");
    } catch (err) {
        res.send(err)
    }
})


app.post("/make_payment",(req,res)=>{
    const data = req.body;
    res.render("payment",{
        detail : data,
        key:publish_key
    })
})


app.post('/payment', async function(req, res){
    try {
        // console.log(req.body)
        stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: req.body.username,
        address: req.body.Address
        })
        .then((customer) => {
        return stripe.charges.create({
        amount: req.body.price, // Charing Rs 25
        description: req.body.productname,
        currency: 'USD',
        customer: customer.id
        });
        })
        .then(async(charge) => {
            const data = await Order.create({
                username:req.body.username,
                productname:req.body.productname,
                price:req.body.price,
                useremail:req.body.useremail,
                phonenumber:req.body.usernumber,
                date:req.body.date,
                orderid:req.body.orderid,
                Address:req.body.Address
            })
            data.save();
            res.render("cod");
        })
        .catch((err) => {
            // console.log(err)
            res.send(err)
        });
    } catch (err) {
        res.send(err)
    }
})




app.listen(port,()=>{
    console.log(`Surver is running at ${port}`)
})