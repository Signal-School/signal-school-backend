const express = require('express')
const router = express.Router()
const adminConstraint = require('../middlewares/adminConstraint')

const OrganizationController = require('../controllers/OrganizationController')

router.post('/organization/create',adminConstraint, OrganizationController.createOrganization)
router.get('/organization/getAll', OrganizationController.retrieveAllOrganizations)
router.get('/organization/get/:id', OrganizationController.retrieveOrganizationById)
router.put('/organization/update/:id',adminConstraint, OrganizationController.updateOrganization)
router.delete('/organization/delete/:id',adminConstraint, OrganizationController.deleteOrganization)


module.exports = router