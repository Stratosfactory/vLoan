const express = require("express")
const router = express.Router()
const objectsController = require("../controller/objects")
const isAuthorized = require("../middleware/authentication")
const { body } = require("express-validator")


router.put("/objects/addobject", [
    body("productFamily").trim().isLength({ min: 3 }),
    body("model").trim().isLength({ min: 3 }),
    body("referenceNumber").trim().isLength({ min: 3 }),
    body("serialNumber").trim().isLength({ min: 3 }),
    body("material").trim().isLength({ min: 3 }),
    body("releaseDate").trim().isLength({ min: 3 })
], isAuthorized, objectsController.createObject)

router.get("/objects/getobject", isAuthorized, objectsController.getObject);

router.post("/objects/deleteobject", objectsController.deleteObject);

router.post("/objects/gettargetobject", objectsController.getTargetObject);

module.exports = router;