const loanObject = require("../models/objectSchema")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")

exports.createObject = ((req, res, next) => {

    const email = req.body.email
    const productFamily = req.body.productFamily
    const model = req.body.model
    const referenceNumber = req.body.referenceNumber
    const serialNumber = req.body.serialNumber
    const material = req.body.material
    const releaseDate = req.body.releaseDate
    const timeStamp = new Date()
    const currentOwner = "undefined"

    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        console.log(validationErrors)
        const error = new Error("Loan Object contains invalid data")
        error.statusCode = 422
        throw error;
    }
    loanObject.findOne({ serialNumber: serialNumber })
        .then((foundObject) => {
            if (foundObject) {
                const error = new Error("Object already exits")

                error.statusCode = 406
                next(error)
            } else {
                const newLoanObject = new loanObject({
                    email: email,
                    productFamily: productFamily,
                    model: model,
                    referenceNumber: referenceNumber,
                    serialNumber: serialNumber,
                    material: material,
                    timeStamp: timeStamp,
                    currentOwner: currentOwner,
                    releaseDate: releaseDate,
                })
                console.log(req.body)
                newLoanObject.save()
                    .then(() => {

                        res.status(200).json({ message: "Object created" })
                    })
                    .catch((err) => {

                        const error = new Error("Object invalid - Try again")
                        error.statusCode = 401
                        next(error)
                    })

            }
        })



});

exports.getObject = ((req, res, next) => {

    let params
    if (req.query.objectId) {
        params = { "_id": { $in: req.query.objectId } }
    } else {
        params = {}
    }


    loanObject.find(params)
        .then((objects) => {

            res.status(200).json({
                message: "Success ",
                objects: objects,
            })
        })
        .catch((err) => { console.log("Failed to fetch data form MongoDB" + err) })
});



exports.deleteObject = ((req, res, next) => {
    const _id = req.body._id
    loanObject.findByIdAndDelete(_id)
        .then(() => {
                res.status(200).json({
                    message: "Object successfully deleted",
                })
            }


        )
        .catch((err) => {
            const error = new Error("Couldn't delete object")
            error.statusCode = 400
            next(error);
            console.log(err)
        })
})

exports.getTargetObject = ((req, res, next) => {
    const idArray = req.body.objects


    const getObjects = async(objects) => {
        let responseArray = []
        for await (let object of objects) {
            loanObject.findById(object._id)
                .then((dbResponse) => {
                    responseArray.push(dbResponse)
                    console.log(dbResponse)
                })
                .catch(err => console.log(err))
        }
        return responseArray
    }

    getObjects(idArray)
        .then(res => console.log(res))
        .catch(err => console.log(err))




})