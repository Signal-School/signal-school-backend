const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/SubjectController');

// List all subjects
router.get('/', subjectController.index);

// Show a single subject by ID
router.get('/:id', subjectController.show);

// Create a new subject
router.post('/', subjectController.store);

// Update a subject by ID
router.put('/:id', subjectController.update);

// Delete a subject by ID
router.delete('/:id', subjectController.destroy);

module.exports = router;
