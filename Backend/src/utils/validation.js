const validator = require("validator");

const validationSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body
    if (!firstName)
        throw new Error("first name required");

    else if (!validator.isEmail(emailId))
        throw new Error("Invalid email address");

    else if (!validator.isStrongPassword(password))
        throw new Error("please enter a strong password")
}

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        "firstName",
        "lastName",
        "photoUrl",
        "age",
        "about",
        "gender"];

    const isEditAllowed = Object.keys(req.body).every(field =>
        allowedEditFields.includes(field));

    return isEditAllowed;

}

module.exports = { validationSignUpData, validateEditProfileData };