const { isValidObjectId } = require('mongoose');
const Student = require('../models/Student')
// const { SubjectChecker } = require('../utils/Checker');
// const { response } = require('express');
const { StudentDetails } = require('../utils/StudentDetails');

//Show list of students by schoolId
const index = (req, res, next) => {
    let schoolId = req.body.schoolId
    Student.find({ schoolId: schoolId })
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

//Show single Student
const show = (req, res, next) => {
    let studentId = req.body.studentId
    Student.findById(studentId)
        .then(response => {
            res.json({
                response
            })
        }).catch(error => {
            res.json({
                message: 'An error Ocuured!'
            })

        })
}

//store new Student
const store = (req, res, next) => {
    if (req.body.schoolId !== null && req.body.schoolId !== undefined && isValidObjectId(req.body.schoolId)) {
        let student = new Student({
            name: req.body.name,
            class: req.body.class,
            age: req.body.age,
            dob: req.body.dob,
            address: req.body.address,
            schoolId: req.body.schoolId,
            subjectIds: req.body.subjectIds
        })
        student.save()
            .then(response => {
                res.json({
                    message: 'Student Added Successfully!'
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error Occured!'
                })
            })
    } else {
        res.json({
            message: 'School Id is not provided or InValid!'
        })
    }
}

//update a student
const update = (req, res, next) => {
    if (req.body.schoolId !== null && req.body.schoolId !== undefined && isValidObjectId(req.body.schoolId)) {
        let studentId = req.body.studentId
        let updateData = {
            name: req.body.name,
            class: req.body.class,
            age: req.body.age,
            dob: req.body.dob,
            address: req.body.address,
            schoolId: req.body.schoolId,
            subjectIds: req.body.subjectIds
        }
        console.log(updateData)
        Student.findByIdAndUpdate(studentId, { $set: updateData })
            .then(() => {
                res.json({
                    message: 'Student updated successfully!'
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error Occured!'
                })
            })
    } else {
        res.json({
            message: 'School Id is not provided or InValid!'
        })
    }
}

//delete an student
const destroy = (req, res, next) => {
    let studentId = req.body.studentId
    Student.findByIdAndRemove(studentId)
        .then(() => {
            res.json({
                message: 'Student deleted successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

// Get student details
const getStudentDetails = async (req, res, next) => {
    try {
        let studentId = req.body.studentId;
        let studentData = await Student.findById(studentId);
        if (studentData) {
            let data = await StudentDetails(studentData);
            res.json({
                student: data
            });
        } else {
            res.status(404).json({
                message: 'Student not found!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'An error Occurred!'
        });
    }
}


module.exports = {
    index, show, store, update, destroy, getStudentDetails
}