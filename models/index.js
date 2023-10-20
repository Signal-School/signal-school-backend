const Admin = require('./Admin');
const School = require('./School');
const Teacher = require('./Teacher');
const Organization = require('./Organization');
const Student = require('./Student');
const Subject = require('./Subject');
const StudentSubject = require('./StudentSubject');
const AcademicYear = require('./AcademicYear');
const Class = require('./Class');
const StudentTimeline = require('./StudentTimeline');
const sequelize = require('../config/db');
const Sequelize = require('sequelize');


Organization.hasMany(School);
School.belongsTo(Organization);


Organization.hasMany(Admin);
Admin.belongsTo(Organization);



School.hasMany(Student);
Student.belongsTo(School);

School.hasMany(AcademicYear);
AcademicYear.belongsTo(School);

School.hasMany(Class);
Class.belongsTo(School);

School.hasMany(Subject);
Subject.belongsTo(School);

// Class.hasMany(AcademicYear);
// AcademicYear.belongsTo(Class);
AcademicYear.hasMany(Class);
Class.belongsTo(AcademicYear);

Class.hasMany(Student);
Student.belongsTo(Class);

Class.hasMany(Subject);
Subject.belongsTo(Class);

Class.hasMany(StudentSubject);
StudentSubject.belongsTo(Class);

Teacher.belongsToMany(School, { through: 'TeacherSchool' });
School.belongsToMany(Teacher, { through: 'TeacherSchool' });

StudentTimeline.belongsTo(Student);




sequelize.sync({ alter: true })
.then(() => {
    console.log('Database synced successfully.');
})
.catch((err) => {
    console.log('Error syncing database: ', err);
});


