// RemarkChecker
// Subject ID checker

const Remark = require('../models/Remark');
const Subject = require('../models/Subject')
const Student = require('../models/Student');

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
    const subjectId = req.body.subjectId;
    
    Subject.findById(subjectId)
        .then((subject) => {
            if (subject) {
                next();
            } else {
                res.status(404).json({
                    message: "Subject not found!"
                });DB_URL='mongodb+srv://ags0504:Password9@signalschooltest.u9qt8l6.mongodb.net/'
                ACCESS_TOKEN_SECRET = 'plavm9a'
                ACCESS_TOKEN_EXPIRE_TIME = 30d
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error"
            });
        });
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
