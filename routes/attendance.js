const express = require('express');
const router = express.Router();
const AttendanceController = require('../controllers/AttendanceController');

router.get('/', AttendanceController.index);
router.get('/show', AttendanceController.show);
router.post('/store', AttendanceController.store);
router.patch('/update', AttendanceController.update);
router.delete('/delete', AttendanceController.destroy);

module.exports = router;
