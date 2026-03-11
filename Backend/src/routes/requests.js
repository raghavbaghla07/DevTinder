const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js")

const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");


requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status

        const allowedStatus = ["ignored", "interested"]
        if (!allowedStatus.includes(status)) {
            return res
                .status(400)
                .json({ message: "Invalid status type: " + status });
        }

        //check if toUSer exist in database
        const toUser = await User.findById(toUserId);
        if (!toUser)
            return res
                .status(404)
                .json({
                    message: "User not found"
                })

        // check id there's an existing connection request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })
        if (existingConnectionRequest)
            return res.status(400).json({
                message: "Connection request already exists"
            });

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();
        res.json({
            message: "Connection request sent successfully",
            data

        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err.message
        })
    }
})
requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        // validate the status:
        const allowedStatus = ["accepted", "rejected"]
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                message: "Invalid status type: " + status
            })
        }

        const connectionRequest = await ConnectionRequest.findOne(
            {
                _id: requestId,
                toUserId: loggedInUser._id,
                status: "interested"
            }
        )
        if (!connectionRequest)
            return res.status(404).json({
                message: "request not found"
            });


        // update the status of the connection request to accepted or rejected
        connectionRequest.status = status;

        const data = await connectionRequest.save();
        res.json({
            message: "connection request: " + status
        })

    } catch (err) {
        return res.status(400).json({
            message: "An error occurred while processing the request",
            error: err.message
        })
    }

})


module.exports = requestRouter;
