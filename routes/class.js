const express = require('express');
const router = express.Router();
const ClassController = require('../controllers/ClassController');


router.post('/class/create', ClassController.createClass);
router.get('/class/getAll', ClassController.getAllClasses);
router.get('/class/get/:id', ClassController.getClassById);
router.put('/class/update/:id', ClassController.updateClass);
router.delete('/class/delete/:id', ClassController.deleteClass);

module.exports = router;