const express = require('express')
const router = express.Router()
const adminConstraint = require('../middlewares/adminConstraint')
const tokenVerify = require('../middlewares/tokenVerify')

const StudentTimeline = require('../controllers/StudentTimelineController')

router.post('/studentTimeline/create',tokenVerify, StudentTimeline.createStudentTimeline)
router.get('/studentTimeline/getAll/:studentId',tokenVerify, StudentTimeline.getStudentTimelinesByStudentId)
router.put('/studentTimeline/update/:id',tokenVerify, StudentTimeline.updateStudentTimeline)
router.delete('/studentTimeline/delete/:id',tokenVerify, StudentTimeline.deleteStudentTimeline)

module.exports = router
