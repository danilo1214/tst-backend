const mongoose = require("mongoose");
const {Schema} = mongoose;

const agentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    siteId: {
        type: Schema.Types.ObjectId,
        ref: "Site",
        required: true
    }
}, {
    timestamps: true
});

const Agent = mongoose.model("agent", agentSchema);
module.exports = Agent;