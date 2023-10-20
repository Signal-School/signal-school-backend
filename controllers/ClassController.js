const Class = require('../models/Class');

//Create a class
const createClass = async (req, res) => {
  try {
    if (!req.admin) {
      throw new Error('You are not authorized to access this route');
    }
    if (!req.admin.currentSchool || req.admin.currentSchool === null) {
      throw new Error('Create a school first');
    }
    const name = req.body.name;
    if (!name) {
      throw new Error('All fields are required');
    }
    const newClass = await Class.create({
      name: name,
      SchoolId: req.admin.currentSchool,
      AcademicYearId: req.body.AcademicYearId
    });
    return res.status(201).json({ message: 'Class created successfully', newClass });

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//Retrieve list of all classes
const getAllClasses = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        let classes;
        if (req.admin) {
            classes = await Class.findAll({ where: { SchoolId: req.admin.currentSchool } });
        }
        //get teacher school from teacherschool table

        return res.status(200).json({ classes });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Retrieve a single class by ID
const getClassById = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const classId = req.params.id;
        const Class = await Class.findOne({ where: { id: classId } });
        return res.status(200).json({ Class });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Update a class
const updateClass = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const classId = req.params.id;
        const name = req.body.name;
        if (!name) {
            throw new Error('All fields are required');
        }
        const Class = await Class.update({ name: name }, { where: { id: classId } });
        return res.status(200).json({ message: 'Class updated successfully', Class });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Delete a class
const deleteClass = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const classId = req.params.id;
        const Class = await Class.destroy({ where: { id: classId } });
        return res.status(200).json({ message: 'Class deleted successfully', Class });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass
}