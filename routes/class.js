const express = require('express');
const router = express.Router();
const ClassController = require('../controllers/ClassController');
const adminConstraint = require('../middlewares/adminConstraint');

router.post('/class/create', adminConstraint, ClassController.createClass);
router.get('/class/getAll',adminConstraint, ClassController.getAllClasses);
router.get('/class/get/:id',adminConstraint, ClassController.getClassById);
router.put('/class/update/:id',adminConstraint, ClassController.updateClass);
router.delete('/class/delete/:id',adminConstraint, ClassController.deleteClass);

module.exports = router;