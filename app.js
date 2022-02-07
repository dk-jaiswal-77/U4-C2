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
const User = require("./schemas/users");

// Branch model
const Branch = require("./schemas/branches");

// Master model
const Master = require("./schemas/masterAccount");

// Saving model
const Saving = require("./schemas/savingsAccount");

// Fixed model
const Fixed = require("./schemas/fixedAccount");
