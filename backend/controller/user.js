const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const { validationResult } = require("express-validator")

exports.createUser = ((req, res, next) => {
    const userName = req.body.userName
    const email = req.body.email
    const role = req.body.role
    const creationDate = new Date().toString()
    const password = req.body.password
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        console.log(validationErrors)
        const error = new Error("Request contains invalid data")
        error.statusCode = 422
        throw error;
    }


    User.findOne({ email: email })
        .then((foundUserDoc) => {
            if (foundUserDoc) {
                const error = new Error("User already exits")
                error.statusCode = 400
                next(error)
            } else {

                bcrypt.hash(password, 12)
                    .then((hashedPW) => {

                        const user = new User({
                            userName: userName,
                            email: email,
                            role: role,
                            creationDate: creationDate,
                            password: hashedPW
                        })
                        user.save()
                            .then(() => {
                                console.log("User created")
                                res.status(201).json({ message: "User created" })

                            })

                        .catch((err) => {
                            const error = new Error("Wrong or missing data")
                            error.statusCode = 400;
                            next(error);
                        });


                    })


                .catch((err) => {
                    const error = new Error(err)
                    error.statusCode = 500
                    error.message = "Creating user profile failed"
                })
            }
        })
        .catch((err) => {
            const error = new Error("Internal server error")
            error.statusCode = 500
            next(error)
        })


});

exports.loginUser = ((req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    let foundUser
    User.findOne({ email: email })
        .then((userInfo) => {
            if (userInfo) {
                foundUser = userInfo
                return bcrypt.compare(password, foundUser.password)
            } else {
                const error = new Error("Wrong login data")
                error.statusCode = 401
                next(error)
            }
        })
        .then((passwordIsOk) => {
            if (!passwordIsOk) {
                const error = new Error("wrong password")
                error.statusCode = 401
                next(error)
            } else {
                const token = jwt.sign({
                    email: foundUser.email,
                    userId: foundUser._id.toString()
                }, "qTrackSecretKey2021", { expiresIn: "1h" })
                res.status(200).json({
                    token: token,
                    message: "success"
                })
            }
        })

})