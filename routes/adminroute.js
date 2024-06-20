const express = require('express');
const router = express.Router();
const cors = require('cors');
const admin = require('../models/Admin');
const Project = require("../models/Project");
router.use(cors());

//get user data
 /** GET Methods */
    /**
     * @openapi
     * '/admin/getprojectdata/':
     *  get:
     *     tags:
     *     - User Controller
     *     summary: Get a user project details
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.get("/getprojectdata", async (req, res) => {
   const projects = await Project.find({});
   res.send({ statusCode: "200", projects });
})

//update
router.put("/:id", async (req, res) => {
   const updatedUser = await Project.findByIdAndUpdate(
      req.params.id,
      {
         $set: { pAccept: true },
      },
      { new: true }
   );
   res.status(200).json(updatedUser);
})


//delete
router.delete("/:id", async (req, res) => {
   console.log(req.params.id);
   const result = await Project.deleteOne({ _id: req.params.id });
   const projects = await Project.find({});
   res.status(200).json(projects);
})

module.exports = router;