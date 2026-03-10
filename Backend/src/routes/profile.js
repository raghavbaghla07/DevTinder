const express = require("express")
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js")
const { validateEditProfileData } = require("../utils/validation.js")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.json({
            data: user
        });
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
})
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req))
            throw new Error("Invalid profile update request");

        const loggedInUser = req.user
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

        await loggedInUser.save();

        res.json({
            message: loggedInUser.firstName + ", your profile has been updated successfully",
            data: loggedInUser
        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }

})
module.exports = profileRouter;