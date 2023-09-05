const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectSchema = new Schema({
    name: {
        type: String
    },
    details: {
        type: String
    }
})

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject


