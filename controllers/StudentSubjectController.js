const StudentSubject = require('../models/StudentSubject');

//add a student to a subject
const addStudentToSubject = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const subjectId = req.params.subjectId;
        const studentId = req.params.studentId;
        const studentSubject = await StudentSubject.create({
            SubjectId: subjectId,
            StudentId: studentId
        });
        return res.status(201).json({ message: 'Student added to subject successfully', studentSubject });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//remove a student from a subject
const removeStudentFromSubject = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const subjectId = req.params.subjectId;
        const studentId = req.params.studentId;
        const studentSubject = await StudentSubject.destroy({
            where: {
                SubjectId: subjectId,
                StudentId: studentId
            }
        });
        return res.status(200).json({ message: 'Student removed from subject successfully', studentSubject });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//get all students in a subject
const getAllStudentsInSubject = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const subjectId = req.params.subjectId;
        const students = await StudentSubject.findAll({ where: { SubjectId: subjectId } });
        return res.status(200).json({ students });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//get all subjects a student is in
const getAllSubjectsOfStudent = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const studentId = req.params.studentId;
        const subjects = await StudentSubject.findAll({ where: { StudentId: studentId } });
        return res.status(200).json({ subjects });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    addStudentToSubject,
    removeStudentFromSubject,
    getAllStudentsInSubject,
    getAllSubjectsOfStudent
}
