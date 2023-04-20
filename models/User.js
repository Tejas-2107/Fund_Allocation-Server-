const mongoose = require('mongoose');
const UserSchema = {
    username:{ type: String, required: true },
    email:{ type: String, required: true, unique: true },
    password:{type:String, required:true},
    pName :{type:String,required:false},
    PDetails:{type:String,required:false},
    pBudget:{type:Number,required:false},
    PAccept:{type:Boolean,default:false}
}

module.exports = mongoose.model("User",UserSchema);
