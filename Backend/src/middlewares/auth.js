const jwt = require("jsonwebtoken")
const User = require("../models/user")

const userAuth = async (req, res, next) => {

    try {
        // Read the token from the request cookies
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // to verify this: 
        const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodedObj;

        const user = await User.findById(_id);

        // find the user
        if (!user) {
            throw new Error("user not found");
        }

        req.user = user;
        next(); // it is called to move to the req handler
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}
module.exports = {
    userAuth
}

