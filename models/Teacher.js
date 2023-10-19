const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const School = require('./School');

const Teacher = sequelize.define('Teacher', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentSchool: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


Teacher.belongsToMany(School, { through: 'TeacherSchool' });
module.exports = Teacher;
