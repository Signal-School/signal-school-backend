// RemarkChecker
// Subject ID checker

const Remark = require('../models/Remark');
const Subject = require('../models/Subject')


const remarkChecker = (req, res, next)=> {
    subjectId = req.body.subjectId;
    const subject = Subject.findById(subjectId);
    if (subject){
        next()
    }
    else {
        res.status(404).json({
            message: "Subject not found!"
        })
    }
}

module.exports = {remarkChecker}