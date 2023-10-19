const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const AcademicYear = require('./AcademicYear');
const Class = require('./Class');

const Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Student.belongsTo(AcademicYear);
Student.belongsTo(Class);

module.exports = Student;
