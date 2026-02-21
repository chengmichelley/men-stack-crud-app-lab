const mongoose = require("mongoose")

const miloBlogSchema = new mongoose.Schema({
    title: String,
    isReadyToPost: Boolean,
    content: {
        type: String,
        required: true,
        minLength: 10
    }
}, { timestamps: true})

module.exports = mongoose.model("miloBlog", miloBlogSchema)