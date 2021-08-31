const express = require("express")
const router = express.Router()
const eventController = require("../controller/events")
const isAuthenticated = require("../middleware/authentication")
const { body } = require("express-validator")

router.post("/events/createevent", [
    body("objects").isLength({ min: 1 }),
    body("loanPurpose").trim().isLength({ min: 3 }),
    body("loanName").trim().isLength({ min: 3 }),
    body("contactPerson").trim().isLength({ min: 3 }),
    body("contactEmail").isEmail(),
    body("loanStart").trim().isDate(),
    body("loanEnd").trim().isDate()
], eventController.createEvent)

module.exports = router