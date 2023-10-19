const express = require('express')
const router = express.Router()
const adminConstraint = require('../middlewares/adminConstraint')
const tokenVerify = require('../middlewares/tokenVerify')
const AdminController = require('../controllers/AdminController')

router.post('/admin/register', AdminController.AdminRegister)
router.post('/admin/login',tokenVerify, AdminController.AdminLogin)
router.get('/admin/getAll', AdminController.AdminRetrieve)
router.get('/admin/get/:id', AdminController.AdminRetrieveById)
router.put('/admin/update/:id', AdminController.AdminUpdate)
router.delete('/admin/delete/:id', AdminController.AdminDelete)


module.exports = router

