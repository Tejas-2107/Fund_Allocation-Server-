const jwt = require('jsonwebtoken');

function verify(req, res, next) {
    const authHeader = req.headers.token;
    try {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.secretkey, (err, user) => {
            if (err) {
                console.log("Token is invalid");
                return res.send({ msg: "Token is invalid", statusCode: "403" });
            }
            req.body.email = user.email;
            next();
        })
    } catch (error) {
        console.log("middleware error", error);
        return res.send({ msg: "error", statusCode:"500"});
    }

}
module.exports = verify;