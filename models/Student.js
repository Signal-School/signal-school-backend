const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema({
    name: {
        type: String
    },
    class: {
        type: String
    },
    age: {
        type: Number 
    },
    dob: {
        type: Date
    },
    address: {
        type: String
    },
    schoolId: {
        type: String
    }
}, {timeStamps: true})


const Student = mongoose.model('Student', studentSchema)

module.exports = Student