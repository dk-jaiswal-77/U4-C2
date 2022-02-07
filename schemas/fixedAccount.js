const mongoose = require("mongoose");

const fixedSchema = mongoose.Schema({
    accountNumber : {type : Number, required : true, unique : true}, 
    balance : {type : Number, required : true},
    interestRate : {type : Number, required : true}, 
    startDate : {type : Date, required : true}, 
    maturityDate : {type : Date, required : true}
}, {versionKey : false, timestamps : true});

const Fixed = mongoose.model("fixed", fixedSchema);

model.exports = Fixed;
