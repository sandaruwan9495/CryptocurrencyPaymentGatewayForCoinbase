const Sequelize = require('sequelize');
const sequelize = require('./dbconection')
const User = sequelize.define('user', {
    fullName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    },
    userName: {
        type: Sequelize.STRING
    }
    
  });
  User.sync();
  module.exports = User;