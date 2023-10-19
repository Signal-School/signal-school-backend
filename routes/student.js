const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');


router.post('/student/create', StudentController.createStudent);
router.get('/student/getAll', StudentController.getAllStudents);
router.get('/student/get/:id', StudentController.getStudentById);
router.put('/student/update/:id', StudentController.updateStudent);
router.delete('/student/delete/:id', StudentController.deleteStudent);

module.exports = router;

