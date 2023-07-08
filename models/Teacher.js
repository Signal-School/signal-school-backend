const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacherSchema = new Schema({
    name: {
        type: String 
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    schoolId: {
        type: String
    }
}, {timestamps: true})

const Teacher = mongoose.model('Teacher', teacherSchema)
module.exports = Teacher
