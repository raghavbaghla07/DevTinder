const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to database:", mongoose.connection.name);
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}
module.exports = connectDB;