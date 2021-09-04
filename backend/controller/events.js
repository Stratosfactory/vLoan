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
    const workflowState = { status: "Submitted", owner: "test@test.de" }



    const historyObject = {
        loanName: loanName,
        email: contactEmail,
        loanStartDate: loanStartDate,
        loanEndDate: loanEndDate,
        workflowState: workflowState,
        eventID: null,
    }


    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        console.log(validationErrors)
        const error = new Error("Loan purpose contains invalid data")
        error.statusCode = 422
        throw error;
    }

    if (loanStartDate > loanEndDate) {
        const error = new Error("End date can't be before start date")
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


                const newEvent = new Event({
                    objects: objects,
                    loanPurpose: loanPurpose,
                    loanName: loanName,
                    contactPerson: contactPerson,
                    contactEmail: contactEmail,
                    loanStartDate: loanStartDate,
                    loanEndDate: loanEndDate,
                    workflowState: workflowState
                })
                newEvent.save()
                    .then((res) => {
                            historyObject.eventID = res._id

                            for (object of objects) {
                                loanObject.findById(object._id)
                                    .then((foundObject) => {
                                        foundObject.loanHistory.push(historyObject)
                                        foundObject.save()
                                            .catch(() => {
                                                const error = new Error("Failed to add insert data into loan object")
                                                error.statusCode(400)
                                                throw error
                                            })
                                    })
                                    .catch(err => {
                                        console.log(err)

                                    })
                            }

                        }




                    )
                    .then(res.status(200).json({ message: `Loan event ${loanName} created` }))
                    .catch((err) => console.log(err))



            }
        })




    .catch((err) => console.log(err))

})


exports.getEvents = ((req, res, next) => {
    Event.find()
        .then((foundEvents) => {
            res.status(200).json({
                message: "Success",
                events: foundEvents
            })
        })
        .catch((err) => {
            let error = new Error("Error while fetching events")
            error.statusCode = 400
            next(error)
            console.log(err)
        })
})