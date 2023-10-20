const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Class = require('./Class');

const AcademicYear = sequelize.define('AcademicYear', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = AcademicYear;
