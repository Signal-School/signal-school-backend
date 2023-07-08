const express = require('express')
const router = express.Router()

const TeacherController = require('../controllers/TeacherController')
const authenticate = require('../middleware/authenticate')

router.get('/', authenticate.authenticate, TeacherController.index)
router.post('/show', authenticate.authenticate, TeacherController.show)
router.post('/store', authenticate.authenticate, TeacherController.store)
router.post('/update', authenticate.authenticate, TeacherController.update)
router.post('/delete', authenticate.authenticate, TeacherController.destroy)

module.exports = router