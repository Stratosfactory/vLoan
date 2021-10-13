const express = require("express")
const router = express.Router()
const userController = require("../controller/user")
const { body } = require("express-validator")
const isAuthorized = require("../middleware/authentication")

router.post("/user/register", [
    body("email").isEmail(),
    body("password").isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }),
    body("userName").trim().isLength({ minLength: 5 }),
    body("role").isString()
], userController.createUser)

router.post("/user/login", userController.loginUser)
router.get("/user/userinfo", isAuthorized, userController.getUserInfo)




module.exports = router;