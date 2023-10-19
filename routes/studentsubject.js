const express = require('express')
const adminConstraint = require('../middlewares/adminConstraint')
const router = express.Router()

const StudentSubjectController = require('../controllers/StudentSubjectController')

router.post('/studentSubject/add/:subjectId/:studentId', adminConstraint, StudentSubjectController.addStudentToSubject)
router.delete('/studentSubject/remove/:subjectId/:studentId', adminConstraint, StudentSubjectController.removeStudentFromSubject)
router.get('/studentSubject/getAll/:subjectId', adminConstraint, StudentSubjectController.getAllStudentsInSubject)
router.get('/studentSubject/getAllSubjectsOfStudent/:studentId', adminConstraint, StudentSubjectController.getAllSubjectsOfStudent)


module.exports = router