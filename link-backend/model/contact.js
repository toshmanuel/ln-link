const Sequelize = require('sequelize');
const db = require('../config/db');


const contact = db.define('contacts', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

}, { freezeTableName: true })

module.exports = contact