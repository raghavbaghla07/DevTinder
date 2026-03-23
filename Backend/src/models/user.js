const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error("Invalid E-mail address")
        }
    },
    password: {
        type: String,
        required: true,
        select: false,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password")
            }
        }
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "others"],
            message: "{VALUE} is not a valid gender type"
        }

    },
    age: {
        type: Number,
        min: [18, "User must be at least 18 years old"]
    },
    photoUrl: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
        validate(value) {
            if (!validator.isURL(value))
                throw new Error("url not valid")
        }
    },
    skills: {
        type: [String]
    },
    about: {
        type: String,
        default: "This is a default of the user!",
    }
}, { timestamps: true })

userSchema.methods.getJWT = async function () {
    //whenever we create an instance of model, this represent that particular instance
    // * this will NOT work with arrow function
    const user = this;

    const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
    return isPasswordValid
}

const User = mongoose.model("User", userSchema)
module.exports = User;

// we can attach some methods that can be applicablt to al