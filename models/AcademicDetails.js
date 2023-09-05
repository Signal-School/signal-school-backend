const mongoose = require('mongoose')
const Schema = mongoose.Schema


const academicDetailsSchema = new Schema({
    subjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },
    remarkId: {
        type: Schema.Types.ObjectId,
        ref: 'Remark'
    },
    semester: {
        type: String
    },
    description: {
        type: String
    }
}, {timeStamps: true})


const AcademicDetails = mongoose.model('AcademicDetails', academicDetailsSchema)

module.exports = AcademicDetails



