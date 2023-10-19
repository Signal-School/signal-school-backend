const express = require('express')
const adminConstraint = require('../middlewares/adminConstraint')
const router = express.Router()

const TeacherController = require('../controllers/TeacherController')

router.post('/teacher/login', TeacherController.teacherLogin)
router.post('/teacher/create', adminConstraint, TeacherController.createTeacher)
router.get('/teacher/getAll', adminConstraint,TeacherController.getAllTeachers)
router.get('/teacher/get/:id', adminConstraint,TeacherController.getTeacherById)
router.put('/teacher/update/:id', adminConstraint,TeacherController.updateTeacher)
router.delete('/teacher/delete/:id', adminConstraint,TeacherController.deleteTeacher)


module.exports = router