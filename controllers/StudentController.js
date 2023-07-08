const Student = require('../models/Student')

//Show list of students
const index = (req, res, next) => {
    Student.find()
    .then(response=> {
        res.json({
            response
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error Occured!'
        })
    })
}

//Show single Student
const show = (req, res, next) => {
    let studentId = req.body.studentId
    Student.findById(studentId)
    .then(response=>{
        res.json({
            response
        })
    }).catch(error=>{
        res.json({
            message: 'An error Ocuured!'
        })

    })
}

// store new Student
const store = (req, res, next) => {
    let student = new Student({
        name: req.body.name,
        class: req.body.class,
        age: req.body.age,
        dob: req.body.dob,
        address: req.body.address,
        schoolId: req.body.schoolId
    })
    student.save()
    .then(response=>{
        res.json({
            message: 'Student Added Successfully!'
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error Occured!'
        })
    })
}

//update a student
const update = (req, res, next) => {
    let studentId = req.body.studentId
    let updateData = {
        name: req.body.name,
        class: req.body.class,
        age: req.body.age,
        dob: req.body.dob,
        address: req.body.address,
        schoolId: req.body.schoolId
    }

    Student.findByIdAndUpdate(studentId, {$set: updateData})
    .then(()=>{
        res.json({
            message: 'Student updated successfully!'
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error Occured!'
        })
    })
}

//delete an student
const destroy = (req, res, next) => {
    let studentId = req.body.studentId
    Student.findByIdAndRemove(studentId)
    .then(()=>{
        res.json({
            message: 'Student deleted successfully!'
        })
    })
    .catch(error=>{
        res.json({
            message: 'An error Occured!'
        })
    })
}

module.exports = {
    index, show, store, update, destroy
}