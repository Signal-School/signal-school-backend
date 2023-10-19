const Teacher = require('../models/Teacher');
const School = require('../models/School');

// Associate a Teacher with a School
const associateTeacherWithSchool = async (req, res) => {
    try {
        if (!req.teacher) {
            return res.status(401).json({ error: 'You are not authorized to access this route' });
        }

        const schoolId = req.body.schoolId;

        if (!schoolId) {
            return res.status(400).json({ error: 'School ID is required' });
        }

        const school = await School.findByPk(schoolId);

        if (!school) {
            return res.status(404).json({ error: 'School not found' });
        }

        // Create a new entry in the TeacherSchool table
        const teacherId = req.teacher.id; // Assuming you have the teacher's ID from authentication
        const teacherSchool = await TeacherSchool.create({
            TeacherId: teacherId,
            SchoolId: schoolId,
        });

        return res.status(200).json({ message: 'Teacher associated with a new school successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get Teacher's Current School
const getCurrentSchool = async (req, res) => {
    try {
        if (!req.teacher) {
            return res.status(401).json({ error: 'You are not authorized to access this route' });
        }

        const teacherId = req.teacher.id; // Assuming you have the teacher's ID from authentication

        // Find the associated schools using TeacherSchool table
        const schools = await TeacherSchool.findAll({
            where: { TeacherId: teacherId },
            include: [School],
        });

        return res.status(200).json({ schools });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    associateTeacherWithSchool,
    getCurrentSchool,
};
