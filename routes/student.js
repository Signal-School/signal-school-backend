const express = require('express')
const router = express.Router()

const StudentController = require('../controllers/StudentController')
const authenticate = require('../middleware/authenticate')

router.get('/',  StudentController.index)
router.post('/show', authenticate.authenticate, StudentController.show)
router.post('/store', authenticate.authenticate, StudentController.store)
router.post('/update', authenticate.authenticate, StudentController.update)
router.post('/delete', authenticate.authenticate, StudentController.destroy)


module.exports = router