const mongoose = require("mongoose");

const savingSchema = mongoose.Schema({
    accountNumber : {type : Number, required : true, unique : true},
    balance : {type : Number, required : true}, 
    interestRate : {type : Number, required : true}
}, {versionKey : false, timestamps : true});

const Saving = mongoose.model("saving", savingSchema);

model.exports(Saving);
