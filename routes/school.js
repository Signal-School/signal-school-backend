const express = require('express')
const adminConstraint = require('../middlewares/adminConstraint')
const tokenVerify = require('../middlewares/tokenVerify')
const router = express.Router()

const SchoolController = require('../controllers/SchoolController')

router.post('/school/create',adminConstraint, SchoolController.createSchool)
router.get('/school/getAll',tokenVerify , SchoolController.getAllSchool)
router.get('/school/get/:id', SchoolController.getSchoolById)
router.put('/school/update/:id', SchoolController.updateSchool)
router.delete('/school/delete/:id', SchoolController.deleteSchool)



module.exports = router