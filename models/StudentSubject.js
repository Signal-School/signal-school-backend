const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const AcademicYear = require('./AcademicYear');
const Class = require('./Class');

const StudentSubject = sequelize.define('StudentSubject', {
  // This model will have no properties other than the foreign keys
});

StudentSubject.belongsTo(AcademicYear);
StudentSubject.belongsTo(Class);

module.exports = StudentSubject;
