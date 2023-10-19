const express = require('express');
const router = express.Router();
const AcademicYearController = require('../controllers/AcademicYearController');


router.post('/academicYear/create', AcademicYearController.createAcademicYear);
router.get('/academicYear/getAll', AcademicYearController.getAllAcademicYears);
router.get('/academicYear/get/:id', AcademicYearController.getAcademicYearById);
router.put('/academicYear/update/:id', AcademicYearController.updateAcademicYear);
router.delete('/academicYear/delete/:id', AcademicYearController.deleteAcademicYear);

module.exports = router;
