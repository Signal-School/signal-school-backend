const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currSchoolSchema = new Schema({
    adminId: {
        type: String
    },
    schoolId: {
        type: String
    }
}, {timestamps: true});

const CurrSchool = mongoose.model('CurrSchool', currSchoolSchema);
module.exports = CurrSchool;

