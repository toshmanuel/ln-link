const Sequelize = require('sequelize');
const db = require('../config/db');
const Contact = require('./contact');


const address = db.define('addresses', {
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    label: { type: Sequelize.STRING}
    
}, {freezeTableName: true})
address.belongsTo(Contact)
module.exports = address