const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Organization = sequelize.define('Organization', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  headOffice: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Organization;
