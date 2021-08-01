const express = require("express")
const router = express.Router()
const userController = require("../controller/user")
const { body } = require("express-validator")

router.post("/register", [
    body("email").isEmail(),
    body("password").isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }),
    body("company").trim().isLength({ minLength: 3 }),
    body("userName").trim().isLength({ minLength: 5 })
], userController.createUser)

router.post("/login", userController.loginUser)




module.exports = router;