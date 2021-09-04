const mongoose = require("mongoose")
const schema = mongoose.Schema


const objectSchema = new schema({
    email: { type: String, required: true },
    productFamily: { type: String, required: true },
    model: { type: String, required: true },
    referenceNumber: { type: String, required: true },
    serialNumber: { type: String, required: true, index: true },
    material: { type: String, required: true },
    releaseDate: { type: String, required: true },
    timeStamp: { type: Date, required: true },
    currentOwner: { type: String },
    loanHistory: [{

        loanName: { type: String },
        email: { type: String },
        loanStartDate: { type: Date },
        loanEndDate: { type: Date },
        workflowState: { type: Object }, //Possible Entry States: Submitted, Reviewed, Approved, Rejected},
        eventID: { type: schema.Types.ObjectId }

    }]

})

module.exports = mongoose.model("Object", objectSchema)