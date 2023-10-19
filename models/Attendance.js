const mongoose = require('mongoose')
const Schema = mongoose.Schema

const attendanceSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    date: {
        type: Date
    },
    progress: {
        type: Number
    },
    status: {
        type: Boolean
    }
}, {timeStamps: true})


const Attendance = mongoose.model('Attendance', attendanceSchema)
module.exports = Attendance