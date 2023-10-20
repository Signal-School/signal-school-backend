const Student = require('../models/Student');
const AcademicYear = require('../models/AcademicYear');
const Class = require('../models/Class');


//Create a student
const createStudent = async (req, res) => {
    try {
        if (!req.admin) {
            console.log(req.admin);
            throw new Error('You are not authorized to access this route');
        }
        if (!req.admin.currentSchool || req.admin.currentSchool === null) {
            throw new Error('Create a school first');
        }
        const name = req.body.name;
        const age = req.body.age;
        const grade = req.body.grade;
        const AcademicYearId = req.body.AcademicYearId;
        const ClassId = req.body.ClassId;
        if (!name || !age || !grade || !AcademicYearId || !ClassId) {
            throw new Error('All fields are required');
        }
        const student = await Student.create({
            name: name,
            age: age,
            grade: grade,
            AcademicYearId: AcademicYearId,
            ClassId: ClassId
        });
        return res.status(201).json({ message: 'Student created successfully', student });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Retrieve list of all students
const getAllStudents = async (req, res) => {
    try {
        if (!req.admin || !req.teacher) {
            throw new Error('You are not authorized to access this route');
        }
        let students;
        if (req.admin) {
            students = await Student.findAll({ where: { currentSchool: req.admin.currentSchool } });
        }
        if(req.teacher){
            students = await Student.findAll({ where: { currentSchool: req.teacher.currentSchool } });
        }
        

        return res.status(200).json({ students });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Retrieve a single student by ID
const getStudentById = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const studentId = req.params.id;
        const student = await Student.findOne({ where: { id: studentId } });
        return res.status(200).json({ student });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Update a student
const updateStudent = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const studentId = req.params.id;
        const name = req.body.name;
        const age = req.body.age;
        const grade = req.body.grade;
        const AcademicYearId = req.body.AcademicYearId;
        const ClassId = req.body.ClassId;
        if (!name || !age || !grade || !AcademicYearId || !ClassId) {
            throw new Error('All fields are required');
        }
        const student = await Student.update({
            name: name,
            age: age,
            grade: grade,
            AcademicYearId: AcademicYearId,
            ClassId: ClassId
        }, { where: { id: studentId } });
        return res.status(201).json({ message: 'Student updated successfully', student });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Delete a student
const deleteStudent = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }

        const studentId = req.params.id;
        const student = await Student.destroy({ where: { id: studentId } });
        return res.status(201).json({ message: 'Student deleted successfully', student });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
}
