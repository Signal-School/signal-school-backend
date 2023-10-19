const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Organization = require('./Organization');

const Admin = sequelize.define('Admin', {
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
    allowNull: true,
  },
});

Admin.belongsTo(Organization);

module.exports = Admin;
