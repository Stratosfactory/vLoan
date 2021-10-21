const mongoose = require("mongoose");
const schema = mongoose.Schema

const eventSchema = new schema({
    objects: [{ object: { type: schema.Types.ObjectId } }],
    loanPurpose: { type: String, required: true },
    loanName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    contactEmail: { type: String, required: true },
    loanStartDate: { type: Date, required: true },
    loanEndDate: { type: Date, required: true },
    activeWorkflow: { type: String, required: true },
    workflowState: { type: Array, required: true },


})

module.exports = mongoose.model("event", eventSchema)