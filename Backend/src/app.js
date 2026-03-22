const express = require("express");
const connectDB = require("./config/database")
const app = express();
const cookieParser = require("cookie-parser")
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

//write once,and use it everywhere, our serever can't read json data, we need a middleware to 
//convert JSON to javascript object
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)
connectDB()
    .then(() => {
        console.log("database connected successfully");
        app.listen(process.env.PORT, () => {
            console.log("server is successfully listening")
        });
    })
    .catch((err) => {
        console.log("database cannot be connected");
        console.error(err);

    })

// first connect to DB, then start start listening