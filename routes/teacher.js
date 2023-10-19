const express = require('express')
const adminConstraint = require('../middlewares/adminConstraint')
const router = express.Router()

const TeacherController = require('../controllers/TeacherController')

router.post('/teacher/create', adminConstraint, TeacherController.createTeacher)
router.get('/teacher/getAll', TeacherController.getAllTeachers)
router.get('/teacher/get/:id', TeacherController.getTeacherById)
router.put('/teacher/update/:id', TeacherController.updateTeacher)
router.delete('/teacher/delete/:id', TeacherController.deleteTeacher)


module.exports = router