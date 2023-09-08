const Student = require('../models/Student');
// const Subject = require('../models/Subject');
const Remark = require('../models/Remark');

//<1><2>Checker
//1 in 2 Checker

exports.SubjectStudentChecker = async (subjectId, studentId) => {
    try {
 
        let student = await Student.findById(studentId).exec()
        if(student){
            if(student.subjectIds.includes(subjectId)){
                return true
            } else {
                return false
            }
        }

    } catch (error) {
        console.error(error)
        return false
    }
}

exports.SubjectRemarkChecker = async (subjectId, remarkId) => {
    try {
        let remark = await Remark.findById(remarkId).exec()
        if(remark){
            if(remark.subjectId === subjectId){
                return true
            } else {
                return false
            }
        }

    } catch (error) {
        console.error(error)
        return false
    }
}