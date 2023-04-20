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
            console.log("User not found");
            return res.send({ msg: "User not found", statusCode: "401" });
        }

        const matchPassword = await bcrypt.compare(password, userExist.password);
        if (!matchPassword) {
            console.log("Password wrong");
            return res.send({ msg: "Password incorrect", statusCode: "403" });
        }

        const token = jwt.sign({ email: userExist.email }, process.env.secretKey, { expiresIn: '1d' });
        console.log("login done")
        res.send({ msg: "log in done", token: token, statusCode: "200" });

    } catch (error) {
        console.log("server error", error);
        res.send({ msg: "Server Error", statusCode: "500" });
    }

})

//dashboardAccess

router.post("/getUserData", verify, async (req, res) => {

    try {
        const user1 = await user.find({ email: req.body.email });

        if (!user1) {
            return res.send({ msg: "user not found", statusCode: "400" });
        }

        res.send({ msg: "verified", user: user1, statusCode: "200" });
        // res.send({email})

    } catch (error) {
        console.log("errror in getuser", error);
        res.send({ msg: "Auth error", statusCode: "500" });
    }
})

//projectdata

router.post("/projectdata", (req, res) => {
    try {
        const { pName, pDetails, pBudget, email } = req.body;
        if (!email) {
            return res.send({ msg: "Token expired login again", statusCode: "403" });
        }
        const newPrjectData = new project({
            email,
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

router.post("/getprojectdata", async (req, res) => {
    try {
        const { email } = req.query;
        console.log(req.body)
        const projects = await project.find({ email: "tejaschougale2107@gmail.com" });
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
