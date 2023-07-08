const express = require('express');
const router = express.Router();

const SchoolController = require('../controllers/SchoolController');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate.authenticate, SchoolController.index);
router.post('/show', authenticate.authenticate, SchoolController.show);
router.post('/add', authenticate.authenticate, SchoolController.store);
router.post('/update', authenticate.authenticate, SchoolController.update);
router.post('/delete', authenticate.authenticate, SchoolController.destroy);
router.post('/change', authenticate.authenticate, SchoolController.UpdateCurrSchool);

module.exports = router;

