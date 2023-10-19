const Subject = require('../models/Subject');
const AcademicYear = require('../models/AcademicYear');
const Class = require('../models/Class');


//Create a subject
const createSubject = async (req, res) => {
  try {
    if (!req.admin) {
      throw new Error('You are not authorized to access this route');
    }
    if (!req.admin.currentSchool || req.admin.currentSchool === null) {
      throw new Error('Create a school first');
    }
    const name = req.body.name;
    const classId = req.body.classId;
    if (!name || !classId) {
      throw new Error('All fields are required');
    }
    const subject = await Subject.create({
      name: name,
      ClassId: classId
    });
    return res.status(201).json({ message: 'Subject created successfully', subject });

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//Retrieve list of all subjects
const getAllSubjects = async (req, res) => {
  try {
    if (!req.admin) {
      throw new Error('You are not authorized to access this route');
    }
    let subjects;
    if (req.admin) {
      subjects = await Subject.findAll({ where: { SchoolId: req.admin.currentSchool } });
    }
    //get teacher school from teacherschool table

    return res.status(200).json({ subjects });
  }
  catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//Retrieve a single subject by ID
const getSubjectById = async (req, res) => {
  try {
    if (!req.admin) {
      throw new Error('You are not authorized to access this route');
    }
    const subjectId = req.params.id;
    const subject = await Subject.findOne({ where: { id: subjectId } });
    return res.status(200).json({ subject });
  }
  catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//Update a subject
const updateSubject = async (req, res) => {
  try {
    if (!req.admin) {
      throw new Error('You are not authorized to access this route');
    }
    const subjectId = req.params.id;
    const name = req.body.name;
    const classId = req.body.classId;
    if (!name || !classId) {
      throw new Error('All fields are required');
    }
    const subject = await Subject.update({
      name: name,
      ClassId: classId
    }, { where: { id: subjectId } });
    return res.status(201).json({ message: 'Subject updated successfully', subject });

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//Delete a subject
const deleteSubject = async (req, res) => {
  try {
    if (!req.admin) {
      throw new Error('You are not authorized to access this route');
    }
    const subjectId = req.params.id;
    const subject = await Subject.destroy({ where: { id: subjectId } });
    return res.status(200).json({ message: 'Subject deleted successfully', subject });
  }
  catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//get all subjects in a class
const getAllSubjectsInClass = async (req, res) => {
  try {
    if (!req.admin) {
      throw new Error('You are not authorized to access this route');
    }
    const classId = req.params.classId;
    const subjects = await Subject.findAll({ where: { ClassId: classId } });
    return res.status(200).json({ subjects });

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//get all classes in a subject
const getAllClassesOfSubject = async (req, res) => {
  try {
    if (!req.admin) {
      throw new Error('You are not authorized to access this route');
    }
    const subjectId = req.params.subjectId;
    const classes = await Subject.findAll({ where: { SubjectId: subjectId } });
    return res.status(200).json({ classes });

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  getAllSubjectsInClass,
  getAllClassesOfSubject
}
