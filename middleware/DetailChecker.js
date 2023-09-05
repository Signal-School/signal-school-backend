// RemarkChecker
// Subject ID checker

const Remark = require('../models/Remark');
const Student = require('../models/Student');
const SubjectChecker = require('../utils/MatchSubject');


const remarkChecker = (req, res, next) => {
    const remarkId = req.body.remarkId;
    Remark.findById(remarkId)
        .then((remark) => {
            if (remark) {
                next();
            } else {
                res.status(404).json({
                    message: "Remark not found!"
                });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        });
}

const subjectChecker = (req, res, next) => {
    try {
        SubjectChecker(subjectId)
        .then(()=>{
            next();
        })
        .catch(()=>{
            res.status(404).json({
                message: "Subject not found!"
            });
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}



const studentChecker = (req, res, next) => {
    const studentId = req.body.studentId;
    Student.findById(studentId)
        .then((student) => {
            if (student) {
                next();
            } else {
                res.status(404).json({
                    message: "Student not found!"
                });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        });
}


module.exports = { remarkChecker, subjectChecker, studentChecker };
