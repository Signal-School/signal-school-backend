const Teacher = require("../models/Teacher");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Teacher Login
const teacherLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const teacher = await Teacher.findOne({ where: { email } });
        if (teacher && (teacher.password == password)) {
            const accessToken = jwt.sign({ email: teacher.email, id: teacher.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
            res.status(200).json({ accessToken });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


//Create a teacher
const createTeacher = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        if (!req.admin.OrganizationId || req.admin.OrganizationId === null) {
            throw new Error('Create an organization first');
        }
        const name = req.body.name;
        const email = req.body.email;
        let password = req.body.password;
        if (!name || !email) {
            throw new Error('All fields are required');
        }
        if(!password){
            // use email as password
            password = email;
        }

        const teacher = await Teacher.create({
            name: name,
            email: email,
            password: password,
            currentSchool: req.admin.currentSchool
        });
        return res.status(201).json({ message: 'Teacher created successfully', teacher });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Retrieve list of all teachers
const getAllTeachers = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        let teachers;
        if (req.admin) {
            teachers = await Teacher.findAll({ where: { currentSchool: req.admin.currentSchool } });
        }
        //get teacher school from teacherschool table

        return res.status(200).json({ teachers });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Retrieve a single teacher by ID
const getTeacherById = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        let teacher;
        if (req.admin) {
            teacher = await Teacher.findOne({ where: { id: req.params.id, currentSchool: req.admin.currentSchool } });
        }
        //get teacher school from teacherschool table

        return res.status(200).json({ teacher });
    }
    catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Update a teacher
const updateTeacher = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const id = req.params.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if (!name || !email) {
            throw new Error('All fields are required');
        }
        const teacher = await Teacher.update({
            name: name,
            email: email,
            password: password,
        }, { where: { id: id, currentSchool: req.admin.currentSchool } });
        return res.status(201).json({ message: 'Teacher updated successfully', teacher });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Delete a teacher
const deleteTeacher = async (req, res) => {
    try {
        if (!req.admin) {
            throw new Error('You are not authorized to access this route');
        }
        const id = req.params.id;
        const teacher = await Teacher.destroy({ where: { id: id, currentSchool: req.admin.currentSchool } });
        return res.status(201).json({ message: 'Teacher deleted successfully', teacher });

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    teacherLogin,
    createTeacher,
    getAllTeachers,
    getTeacherById,
    updateTeacher,
    deleteTeacher
}
