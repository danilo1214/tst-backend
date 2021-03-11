const mongoose = require("mongoose");
const {Schema} = mongoose;

const siteSchema = new Schema({
    category: {
        type: String,
        required: true
    },
    criteria_txt: {
        type: String
    },
    danger: {
        type: String
    },
    date_inscribed: {
        type: Number
    },
    extension: {
        type: Number
    },
    historical_description: {
        type: String
    },
    http_url: {
        type: String,
        required: true
    },
    id_number: {
        type: Number
    },
    image_url: {
        type: String,
        required: true
    },
    iso_code: {
        type: String
    },
    justification: {
        type: String
    },
    latitude: {
        type: Number,
        required: true
    },
    location: {
        type: String
    },
    longitude: {
        type: Number,
        required: true
    },
    long_description: {
        type: String
    },
    region: {
        type: String
    },
    revision: {
        type: String
    },
    secondary_dates: {
        type: String
    },
    short_description: {
        type: String
    },
    site: {
        type: String,
        required: true
    },
    states: {
        type: String,
        required: true
    },
    transboundary: {
        type: Number
    },
    unique_number: {
        type: Number
    },
    agents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'agent'
        }
    ]
}, {
    timestamps: true
});
const Site = mongoose.model("site", siteSchema);
module.exports = Site;