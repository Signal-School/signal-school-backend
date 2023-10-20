const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');
const adminConstraint = require('../middlewares/adminConstraint');
const tokenVerify = require('../middlewares/tokenVerify');


router.post('/student/create', adminConstraint,StudentController.createStudent);
router.get('/student/getAll/:classId', tokenVerify, StudentController.getAllStudents);
router.get('/student/get/:id', StudentController.getStudentById);
router.put('/student/update/:id', StudentController.updateStudent);
router.delete('/student/delete/:id', StudentController.deleteStudent);

module.exports = router;

