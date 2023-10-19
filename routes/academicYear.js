const express = require('express');
const router = express.Router();
const AcademicYearController = require('../controllers/AcademicYearController');
const adminConstraint = require('../middlewares/adminConstraint');

router.post('/academicYear/create', adminConstraint,AcademicYearController.createAcademicYear);
router.get('/academicYear/getAll', AcademicYearController.getAllAcademicYears);
router.get('/academicYear/get/:id', AcademicYearController.getAcademicYearById);
router.put('/academicYear/update/:id', adminConstraint,AcademicYearController.updateAcademicYear);
router.delete('/academicYear/delete/:id', adminConstraint,AcademicYearController.deleteAcademicYear);

module.exports = router;
