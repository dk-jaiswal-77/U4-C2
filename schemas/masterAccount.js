const mongoose = require("mongoose");

const masterSchema = mongoose.Schema({
    balance : {type : Number, required : true}, 
    user_id : {type : mongoose.Schema.Types.ObjectId, ref : "user", required : true}, 
    relationship_manager_id : {type : mongoose.Schema.Types.ObjectId, required : true, ref : "user"}, 
    branch_id : {type : mongoose.Schema.Types.ObjectId, required : true, ref : "branch"}
}, {versionKey : false, timestamps : true});

const Master = mongoose.model("master", masterSchema);

module.exports = Master;