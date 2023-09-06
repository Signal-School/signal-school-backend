const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const Subject = require('../models/Subject');

// Show list of attendances
const index = (req, res, next) => {
    Attendance.find()
    .then(response => {
        res.json({
            response
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred!'
        });
    });
}

// Show single Attendance by studentId, subjectId, and date
const show = (req, res, next) => {
    let studentId = req.body.studentId;
    let subjectId = req.body.subjectId;
    let date = req.body.date;

    Attendance.findOne({
        studentId: studentId,
        subjectId: subjectId,
        date: date
    })
    .then(response => {
        if (response) {
            res.json({
                response
            });
        } else {
            res.status(404).json({
                message: 'Attendance not found!'
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred!'
        });
    });
}

// Store new Attendance
const store = (req, res, next) => {
    let attendance = new Attendance({
        studentId: req.body.studentId,
        subjectId: req.body.subjectId,
        date: req.body.date,
        progress: req.body.progress,
        status: req.body.status
    });
    attendance.save()
    .then(response => {
        res.status(201).json({
            message: 'Attendance Added Successfully!'
        });
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred!'
        });
    });
}

// Update an Attendance by studentId, subjectId, and date
const update = (req, res, next) => {
    let studentId = req.body.studentId;
    let subjectId = req.body.subjectId;
    let date = req.body.date;

    let updatedData = {
        studentId: req.body.studentId,
        subjectId: req.body.subjectId,
        date: req.body.date,
        progress: req.body.progress,
        status: req.body.status
    };

    Attendance.findOneAndUpdate({
        studentId: studentId,
        subjectId: subjectId,
        date: date
    }, {$set: updatedData})
    .then(response => {
        if (response) {
            res.json({
                message: 'Attendance Updated Successfully!'
            });
        } else {
            res.status(404).json({
                message: 'Attendance not found!'
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred!'
        });
    });
}

// Delete an Attendance by studentId, subjectId, and date
const destroy = (req, res, next) => {
    let studentId = req.body.studentId;
    let subjectId = req.body.subjectId;
    let date = req.body.date;

    Attendance.findOneAndRemove({
        studentId: studentId,
        subjectId: subjectId,
        date: date
    })
    .then(response => {
        if (response) {
            res.json({
                message: 'Attendance Deleted Successfully!'
            });
        } else {
            res.status(404).json({
                message: 'Attendance not found!'
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred!'
        });
    });
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
