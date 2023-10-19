const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Student = require('./Student');

const StudentTimeline = sequelize.define('StudentTimeline', {
    date : {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    progress : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    attendanceStatus : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image :{
        type: DataTypes.STRING,
        allowNull: true,
    },
});


StudentTimeline.belongsTo(Student);

module.exports = StudentTimeline;