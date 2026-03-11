const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest.js")

const USER_SAFE_DATA = "firstName lastName photoUrl"
//get all the pending connection request for loggedInUser

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA)

        res.json(
            { data: connectionRequests }
        )
    } catch (err) {
        return res.status(400)
            .json({
                message: "Error fetching connection requests",
                error: err.message
            })
    }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },

            ],
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA)

        // console.log(connectionRequests)
        const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId
            }
            return row.fromUserId
        })
        // console.log(connectionRequests)
        res.json({ data })

    } catch (err) {
        return res.status(400)
            .json({
                message: err.message
            })
    }
})
module.exports = userRouter