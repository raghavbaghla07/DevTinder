const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest.js")


//get all the pending connection request for loggedInUser
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId,
            status: "interested"
        }).populate("fromUserId", "firstName lastName photoUrl")

        return res.json({
            message: "data fethed successfully",
            data: connectionRequests
        })
    } catch (err) {
        return res.status(400)
            .json({
                message: "Error fetching connection requests",
                error: err.message
            })
    }
})

module.exports = userRouter