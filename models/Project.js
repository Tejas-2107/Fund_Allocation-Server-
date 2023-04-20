const mongoose = require('mongoose');
const ProjectSchema = {
    email:{type:String,required:true},
    pName:{ type: String, required: true },
    pDetails:{ type: String, required: true },
    pBudget:{type:Number, required:true},
    pAccept:{type:Number,default:false}
}

module.exports = mongoose.model("project",ProjectSchema);