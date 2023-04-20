const jwt = require('jsonwebtoken');

function verify(req, res, next) {
    const authHeader = req.headers.token;
    console.log("authheader",authHeader);
    try {
        const token = authHeader.split(" ")[1];
        console.log(token);
        jwt.verify(token, process.env.secretkey, (err, user) => {
            if (err) {
                console.log("Token is invalid");
                return res.send({ msg: "Token is invalid", statusCode: "403" });
            }
            req.body.email = user.email;
            // console.log(user.email, "aaaaaaaaaaaaa")
            next();
            console.log("verfied");

        })
    } catch (error) {
        console.log("middleware error", error);
        return res.send({ msg: "error", statusCode:"500"});
    }

}
module.exports = verify;