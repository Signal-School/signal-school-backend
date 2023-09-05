const express = require('express');
const router = express.Router();
const remarkController = require('../controllers/RemarkController');
const SubjectChecker = require('../middleware/SubjectChecker');
// Create a new Remark
router.post('/', SubjectChecker.remarkChecker, remarkController.createRemark);

// Get all Remarks
router.get('/', remarkController.getAllRemarks);

// Get a single Remark by ID
router.get('/:id', remarkController.getRemarkById);

// Update a Remark by ID
router.put('/:id', remarkController.updateRemarkById);

// Delete a Remark by ID
router.delete('/:id', remarkController.deleteRemarkById);

module.exports = router;
