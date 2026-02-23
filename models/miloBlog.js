const mongoose = require("mongoose")

const miloBlogSchema = new mongoose.Schema({
    name: String,
    isReadyToPost: {
        type: Boolean,
        default: false,
    },
    content: {
        type: String,
        required: true,
        minLength: 1
    }
}, { timestamps: true})

module.exports = mongoose.model("miloBlog", miloBlogSchema)