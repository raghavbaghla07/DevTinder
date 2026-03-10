const express = require('express');
const authRouter = express.Router()
const { validationSignUpData } = require("../utils/validation.js")
const User = require("../models/user.js")
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
    try {
        //* 1st step: Validation of data:
        validationSignUpData(req);

        //* 2nd: Encrypt the pass
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        // we are creating a new instance of this mdoel user
        //! const user = new User(req.body); (not a good way)
        // never trust req.body.. user can send anything

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });

        await user.save();
        res.send("user added successfully")

    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
})

authRouter.post("/login", async (req, res) => {

    try {
        const { emailId, password } = req.body;

        //*check if user is present in database?
        const user = await User.findOne({ emailId: emailId }).select("+password");

        if (!user)
            throw new Error("invalid credentials");

        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                path: "/"
            });
            res.send("user login successful");
        } else
            throw new Error("invalid credentials")
    } catch (err) {

        res.status(400).send("ERROR: " + err.message);
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    })
    res.json({
        message: "Logout successful"
    });

})
module.exports = authRouter;