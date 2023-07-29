const express = require("express");
const router = express.Router();
const user = require("../models/User");
const project = require("../models/Project");
const bcrypt = require("bcrypt");
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const verify = require("../verifytoken");
router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));

//signup

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const userPresent = await user.findOne({ email: email });
        console.log(userPresent, "userpresent");
        console.log("first me");
        const hashPassword = await bcrypt.hash(password, 10);
        if (userPresent) {
            return res.send({ msg: "email already exist", statusCode: "401" });
        }
        const newUser = new user({
            username: username,
            email: email,
            password: hashPassword
        });
        newUser.save();
        return res.send({ msg: "User created", statusCode: "200" });
    } catch (error) {
        console.log(error);
        res.send({ msg: "Server error", statusCode: "500" });
    }
})

//login

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userExist = await user.findOne({ email: email });
        if (!userExist) {
            return res.send({ msg: "User not found", statusCode: "401" });
        }

        const matchPassword = await bcrypt.compare(password, userExist.password);
        if (!matchPassword) {
            console.log("Password wrong");
            return res.send({ msg: "Password incorrect", statusCode: "403" });
        }

        const token = jwt.sign({ email: userExist.email }, process.env.secretKey, { expiresIn: '1d' });
        res.send({ msg: "log in done", token: token, statusCode: "200" });

    } catch (error) {
        console.log("server error", error);
        res.send({ msg: "Server Error", statusCode: "500" });
    }

})

//userprofile

router.post("/sendProjectData",verify, (req, res) => {
    try {
        const { pName, pDetails, pBudget } = req.body;
        const newPrjectData = new project({
            email:req.body.email,
            pName,
            pDetails,
            pBudget
        });
        newPrjectData.save();
        res.send({ msg: "Project data saved", statusCode: "200" });
    } catch (error) {
        console.log(error);
        res.send({ msg: "server error", statusCode: "500" });
    }
})

//projectdetail

router.get("/getUserProfile", verify, async (req, res) => {
    try {
        const projects = await project.find({ email: req.body.email });
        if (!projects) {
            res.send({ msg: "Project not found", statusCode: "403" })
        }
        res.send({ statusCode: "200", projects });
    } catch (error) {
        console.log(error);
        res.send({ msg: "server error", statusCode: "500" });
    }
})
module.exports = router
