// RemarkChecker
// Subject ID checker

const Remark = require('../models/Remark');
const Subject = require('../models/Subject')

const remarkChecker = (req, res, next) => {
    const subjectId = req.body.subjectId;
    
    Subject.findById(subjectId)
        .then((subject) => {
            if (subject) {
                next();
            } else {
                res.status(404).json({
                    message: "Subject not found!"
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

module.exports = { remarkChecker };
