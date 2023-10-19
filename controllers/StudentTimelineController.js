const StudentTimeline = require('../models/StudentTimeline');

// Create Student Timeline
const createStudentTimeline = async (req, res) => {
    try {
        const { date, progress, attendanceStatus, studentId } = req.body;
        if (!date || !progress || !attendanceStatus || !studentId) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const studentTimeline = await StudentTimeline.create({
            date,
            progress,
            attendanceStatus,
            StudentId: studentId,
        });

        return res.status(201).json({ message: 'Student timeline created successfully', studentTimeline });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Retrieve Student Timelines by Student ID
const getStudentTimelinesByStudentId = async (req, res) => {
    try {
        const studentId = req.params.studentId;

        if (!studentId) {
            return res.status(400).json({ error: 'Student ID is required' });
        }

        const studentTimelines = await StudentTimeline.findAll({
            where: { StudentId: studentId },
        });

        return res.status(200).json({ studentTimelines });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Update Student Timeline by ID
const updateStudentTimeline = async (req, res) => {
    try {
        const timelineId = req.params.id;
        const { date, progress, attendanceStatus } = req.body;

        if (!date || !progress || !attendanceStatus) {
            return res.status(400).json({ error: 'Please provide date, progress, and attendance status' });
        }

        const studentTimeline = await StudentTimeline.findByPk(timelineId);

        if (!studentTimeline) {
            return res.status(404).json({ error: 'Student timeline not found' });
        }

        studentTimeline.date = date;
        studentTimeline.progress = progress;
        studentTimeline.attendanceStatus = attendanceStatus;

        await studentTimeline.save();

        return res.status(200).json({ message: 'Student timeline updated successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete Student Timeline by ID
const deleteStudentTimeline = async (req, res) => {
    try {
        const timelineId = req.params.id;
        const studentTimeline = await StudentTimeline.findByPk(timelineId);

        if (!studentTimeline) {
            return res.status(404).json({ error: 'Student timeline not found' });
        }

        await studentTimeline.destroy();

        return res.status(200).json({ message: 'Student timeline deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createStudentTimeline,
    getStudentTimelinesByStudentId,
    updateStudentTimeline,
    deleteStudentTimeline,
};
