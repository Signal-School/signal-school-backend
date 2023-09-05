const AcademicDetails = require('../models/AcademicDetails')

// Create a new AcademicDetails
exports.createAcademicDetails = async (req, res) => {
    try {
        const { subjectId, studentId, remarkId, description, semester } = req.body
        const newAcademicDetails = new AcademicDetails({
        subjectId,
        studentId,
        remarkId,
        description,
        semester
        })
        const savedAcademicDetails = await newAcademicDetails.save()
        res.json(savedAcademicDetails)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
    }

// Get all AcademicDetailss
exports.getAllAcademicDetails = async (req, res) => {
    try {
        const academicDetailss = await AcademicDetails.find()
        res.json(academicDetailss)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
    }

// Get a single AcademicDetails by ID
exports.getAcademicDetailsById = async (req, res) => {
    try {
        const academicDetails = await AcademicDetails.findById(req.params.id)
        if (!academicDetails) {
        return res.status(404).json({ message: 'AcademicDetails not found' })
        }
        res.json(academicDetails)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
    }

// Update a AcademicDetails by ID
exports.updateAcademicDetailsById = async (req, res) => {
    try {
        const { subjectId, studentId, remarkId, description, semester } = req.body
        const updatedAcademicDetails = await AcademicDetails.findByIdAndUpdate(
        req.params.id,
        { subjectId, studentId, remarkId, description, semester },
        { new: true }
        )
        if (!updatedAcademicDetails) {
        return res.status(404).json({ message: 'AcademicDetails not found' })
        }
        res.json(updatedAcademicDetails)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
    }

// Delete a AcademicDetails by ID
exports.deleteAcademicDetailsById = async (req, res) => {
    try {
        const deletedAcademicDetails = await AcademicDetails.findByIdAndDelete(req.params.id)
        if (!deletedAcademicDetails) {
        return res.status(404).json({ message: 'AcademicDetails not found' })
        }
        res.json(deletedAcademicDetails)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
    }


