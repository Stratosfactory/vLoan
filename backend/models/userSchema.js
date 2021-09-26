const mongoose = require("mongoose")

const schema = mongoose.Schema

const userSchema = new schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    creationDate: { type: Date, required: true },
    role: { type: String, required: true }, // Can be Admin, Operator, Security, Finance


})

module.exports = mongoose.model("User", userSchema)