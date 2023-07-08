const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SchoolSchema = new Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    adminId: {
        type: String
    }
}, {timestamps: true})


const School = mongoose.model('School', SchoolSchema)
module.exports = School