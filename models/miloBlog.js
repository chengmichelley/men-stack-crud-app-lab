const mongoose = require("mongoose")

const blogPageSchema= new mongoose.Schema({
    title: String,
    isReadyToPost: Boolean,
    content: {
        type: String,
        required: true,
        minLength: 10
    }
}, { timestamps: true})

module.exports = mongoose.model("blogPage", blogPageSchema)