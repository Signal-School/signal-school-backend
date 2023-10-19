const { Sequelize } = require('sequelize');
const config = require('./config.json');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true
    }
  },
});

module.exports = sequelize;
