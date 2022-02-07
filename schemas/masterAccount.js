const mongoose = require("mongoose");

const masterSchema = mongoose.Schema({
    balance : {type : Number, required : true}
}, {versionKey : false, timestamps : true});

const Master = mongoose.model("master", masterSchema);

model.exports = Master;