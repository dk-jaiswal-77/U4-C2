const express = require("express");
const mongoose = require("mongoose");

// creating express app
const app = express();

// connecting to db
const dbURI = "mongodb+srv://dk-jaiswal-77:Admin123@nodetuts.xzsov.mongodb.net/banking?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then((result) => {
        console.log("connected to db");
        app.listen(3002);
    })
    .catch((error) => {
        console.log(error);
    });

// -------------------------------------------------->
// User model
const User = require("./schemas/users.js");

// Branch model
const Branch = require("./schemas/branches.js");

// Master model
const Master = require("./schemas/masterAccount.js");

// Saving model
const Saving = require("./schemas/savingsAccount");

// Fixed model
const Fixed = require("./schemas/fixedAccount.js");
const { TopologyDescription } = require("mongodb");

// ------------------------------------------------------->
app.use(express.json());
// get request for masters
app.get("/masters", async (req, res) => {
    try{
        const masters = await Master.find()
        .populate({path : "user_id"})
        .lean()
        .exec();
        res.send(masters);
    }catch(error){
        res.send(error.message);
    }
})
// --------------------------------------------->
// post request for users
app.post("/users", async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.send(user);
    }catch(error){
        res.send(error.message);
    }
});

// get request for users
app.get("/users", async (req, res) => {
    try{
        const users = await User.find().lean().exec();
        res.send(users);
    }catch(error){
        res.send(error.message);
    }
})

// ------------------------------------------>
//  post request for branches
app.post("/branches", async (req, res) => {
    try{
        const branch = await Branch.create(req.body);
        res.send(branch);
    }catch(error){
        res.send(error.message);
    }
});

app.get("/branches", async (req, res) => {
    try{
        const branches = await Branch.find().lean().exec();
        res.send(branches);
    }catch(error){
        res.send(error.message);
    }
})
//------------------------------------------>
// post request for saving account
app.post("/savings", async (req, res) => {
    try{
        const saving = await Saving.create(req.body);
        // let master_id = req.body.master_id;
        let master = await Master.findById(req.body.master_id).lean().exec();
        master = JSON.parse(master);
        let total_balance = req.body.balance + master.balance;
        await Master.findByIdAndUpdate(req.body.master_id, {balance : total_balance});

    }catch(error){
        res.send(error.message);
    }
});
// -------------------------------------------->
// post request for fixed account
app.post("/fixeds", async (req, res) => {
    try{
        const fixed = await Fixed.create(req.body);
        let master = await Master.findById(req.body.master_id).lean().exec();
        master = JSON.parse(master);
        let total_balance = req.body.balance + master.balance;
        await Master.findByIdAndUpdate(req.body.master_id, {balance : total_balance});
    }catch(error){
        res.send(error.message);
    }
});
// -------------------------------------------->
// get api takign master account id and returning details of all the accounts user has

app.get("/masters/:id", async (req, res) => {
    try{
        const master = await Master.findById(req.params.id).lean().exec();

        let saving = await Saving.find({master_id : req.params.id}, {accountNumber : true, balance : true}).lean().exec();

        let fixed = await Fixed.find({master_id : req.params.id}, {accountNumber : true, balance : true}).lean().exec();

        let accounts_collection = [saving, fixed];
        accounts_collection = JSON.stringify(accounts_collection);
        res.send(accounts_collection);
    }catch(error){
        res.send(error.message);
    }
});

// -------------------------------------------->