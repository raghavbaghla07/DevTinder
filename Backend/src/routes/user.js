const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest.js")
const User = require("../models/user.js")

const USER_SAFE_DATA = "firstName lastName photoUrl about gender"


//get all the pending connection request for loggedInUser
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA)

        const data = connectionRequests.map((req) => req.fromUserId);
        res.json({ data });

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
        const loggedInUser = req.user;
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

userRouter.get("/feed", userAuth, async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit
        limit = limit > 50 ? 50 : limit;

        // what we have to avoid:
        // 1. user own card.
        // 2. whom we ignnored or already sent req.
        // 3. our connection
        //4. who sent us connection req

        const loggedInUser = req.user;

        // find all connection request sent or received
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        })
            .select("fromUserId toUserId")


        const hideUsersFromFeed = new Set();
        connectionRequests.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString()),
                hideUsersFromFeed.add(req.toUserId.toString())
        })
        // we will find the unique user and push all of them to set

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit)

        res.json({ data: users })
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })

    }
})

module.exports = userRouter