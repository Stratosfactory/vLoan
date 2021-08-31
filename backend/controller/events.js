const Event = require("../models/eventSchema")
const jwt = require("jsonwebtoken")
const loanObject = require("../models/objectSchema")
const { validationResult } = require("express-validator")



exports.createEvent = ((req, res, next) => {

    const objects = req.body.objects
    const loanPurpose = req.body.loanPurpose
    const loanName = req.body.loanName
    const contactPerson = req.body.contactPerson
    const contactEmail = req.body.contactEmail
    const loanStartDate = new Date(req.body.loanStart)
    const loanEndDate = new Date(req.body.loanEnd)
    const workflowState = "Submitted"



    const historyObject = {
        loanName: loanName,
        email: contactEmail,
        loanStartDate: loanStartDate,
        loanEndDate: loanEndDate,
        workflowState: workflowState,
    }


    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        console.log(validationErrors)
        const error = new Error("Loan purpose contains invalid data")
        error.statusCode = 422
        throw error;
    }

    if (loanStartDate > loanEndDate) {
        const error = new Error("End date cant be before start date")
        error.statusCode = 422
        throw error;
    }




    async function getObjects() {
        let dbResponse = ""
        let dbArr = []
        for (let object of objects) {
            dbResponse = await loanObject.findById(object._id).catch(err => console.log(err));
            dbArr.push(dbResponse)
        }
        return dbArr
    }

    getObjects()
        .then((returnedVal) => {

            let errorObject = {
                isError: false,
                objectName: null
            }
            for (let object of returnedVal) {
                for (let item of object.loanHistory) {

                    if ((item.loanStartDate >= loanStartDate && item.loanStartDate <= loanEndDate && item.loanEndDate >= loanEndDate) ||
                        (item.loanStartDate <= loanStartDate && item.loanEndDate >= loanEndDate) ||
                        (item.loanEndDate >= loanStartDate && item.loanEndDate <= loanEndDate && item.loanStartDate <= loanStartDate) ||
                        (item.loanStartDate >= loanStartDate && item.loanEndDate <= loanEndDate)) {
                        errorObject.isError = true;
                        errorObject.objectName = object.serialNumber

                        return errorObject

                    }


                }

            }

            return errorObject
        })
        .then((validationObject) => {
            if (validationObject.isError) {
                let error = new Error(`Object with serialno ${validationObject.objectName} already in use at this date`)
                error.statusCode = 400
                next(error)
            } else {
                for (object of objects) {
                    loanObject.findById(object._id)
                        .then((foundObject) => {
                            foundObject.loanHistory.push(historyObject)
                            foundObject.save()
                        })
                        .catch(err => {
                            console.log(err)

                        })
                }

                const newEvent = new Event({
                    objects: objects,
                    loanPurpose: loanPurpose,
                    loanName: loanName,
                    contactPerson: contactPerson,
                    contactEmail: contactEmail,
                    loanStartDate: loanStartDate,
                    loanEndDate: loanEndDate,
                    workflowState: "Submitted",
                })
                newEvent.save()
                    .then(res.status(200).json({ message: `Loan event ${loanName} created` }))
            }
        })


    .then((res) => console.log(res))

    .catch((err) => console.log(err))

})