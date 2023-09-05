const express = require('express');
const router = express.Router();

const academicDetailsController = require('../controllers/AcademicDetailsController');
const DetailChecker = require('../middleware/DetailChecker');

// Create a new AcademicDetails

router.post('/', DetailChecker.remarkChecker, DetailChecker.subjectChecker, DetailChecker.studentChecker, academicDetailsController.createAcademicDetails);

// Get all AcademicDetailss

router.get('/', academicDetailsController.getAllAcademicDetails);

// Get a single AcademicDetails by ID

router.get('/:id', academicDetailsController.getAcademicDetailsById);

// Update a AcademicDetails by ID

router.put('/:id', academicDetailsController.updateAcademicDetailsById);

// Delete a AcademicDetails by ID

router.delete('/:id', academicDetailsController.deleteAcademicDetailsById);

module.exports = router;


