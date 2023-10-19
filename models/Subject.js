const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const AcademicYear = require('./AcademicYear');
const Class = require('./Class');

const Subject = sequelize.define('Subject', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Subject.belongsTo(AcademicYear);
Subject.belongsTo(Class);

module.exports = Subject;
