const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')



router.post('/teacher/login', AuthController.teacherLogin)
router.post('/admin/login', AuthController.adminLogin)
router.post('/admin/register', AuthController.adminRegister)


module.exports = router
