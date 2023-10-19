const AcademicYear = require('../models/AcademicYear');
const Class = require('../models/Class');

//Create an academic year
const createAcademicYear = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        if (!req.admin.currentSchool || req.admin.currentSchool === null) {
            throw new Error('Create a school first');
        }
        const name = req.body.name;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const ClassId = req.body.ClassId;
        if (!name || !startDate || !endDate || !ClassId) {
            throw new Error('All fields are required');
        }
        const academicYear = await AcademicYear.create({
            name: name,
            startDate: startDate,
            endDate: endDate,
            ClassId: ClassId
        });
        return res.status(201).json({ message: 'Academic year created successfully', academicYear });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Retrieve list of all academic years
const getAllAcademicYears = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        let academicYears;
        if (req.admin) {
            academicYears = await AcademicYear.findAll({ where: { ClassId: req.admin.currentClass } });
        }
        //get academic year school from academicYearschool table

        return res.status(200).json({ academicYears });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Retrieve a single academic year by ID
const getAcademicYearById = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const academicYearId = req.params.id;
        const academicYear = await AcademicYear.findOne({ where: { id: academicYearId } });
        return res.status(200).json({ academicYear });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Update an academic year
const updateAcademicYear = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const academicYearId = req.params.id;
        const name = req.body.name;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const ClassId = req.body.ClassId;
        if (!name || !startDate || !endDate || !ClassId) {
            throw new Error('All fields are required');
        }
        const academicYear = await AcademicYear.update({
            name: name,
            startDate: startDate,
            endDate: endDate,
            ClassId: ClassId
        }, { where: { id: academicYearId } });
        return res.status(201).json({ message: 'Academic year updated successfully', academicYear });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Delete an academic year
const deleteAcademicYear = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const academicYearId = req.params.id;
        await AcademicYear.destroy({ where: { id: academicYearId } });
        return res.status(201).json({ message: 'Academic year deleted successfully' });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createAcademicYear,
    getAllAcademicYears,
    getAcademicYearById,
    updateAcademicYear,
    deleteAcademicYear
}