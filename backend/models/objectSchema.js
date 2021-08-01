const mongoose = require("mongoose")
const schema = mongoose.Schema


const loanHistorySchema = new schema({
    loanReason: { type: String },
    email: { type: String },
    startDate: { type: Date },
    endDate: { type: Date }
})


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
    loanHistory: [loanHistorySchema]

})

module.exports = mongoose.model("Object", objectSchema)