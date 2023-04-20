const express = require('express');
const router = express.Router();
const cors = require('cors');
const admin = require('../models/Admin');
const Project = require("../models/Project");
router.use(cors());

//get user data
router.get("/getprojectdata", async (req, res) => {
   const projects = await Project.find({});
   res.send({ statusCode: "200", projects });
})

//update
router.put("/:id", async (req, res) => {
   console.log("put id", req.params.id);
   //  Project.find({_id:req.params.id},{$set:{pAccept:true}});
   //  res.send({statusCode:"200",msg:"accpeted"});
   const updateUser = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set:{pAccept:true},
      },
      { new: true }
    );
  res.status(200).json(updateUser);
})


//delete
router.delete("/:id", async (req, res) => {
   console.log(req.params.id);
   const result = await Project.deleteOne({ _id: req.params.id });
   res.send({ msg: "deleted", result });
})

module.exports = router;


// const updateUser = await Project.findByIdAndUpdate(