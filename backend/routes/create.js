const express = require("express")
const router = express.Router()
const objectsController = require("../controller/objects")
const isAuthenticated = require("../middleware/authentication")


router.put("/objects/addobject", objectsController.createObject)

router.get("/objects/getobject", objectsController.getObject)

router.post("/objects/deleteobject", objectsController.deleteObject)

module.exports = router;