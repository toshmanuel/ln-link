const Sequelize = require('sequelize');
const db = require('../config/db');


const invoice = db.define('invoices', {
    name: {
        type: Sequelize.STRING,
    },
    
}, {freezeTableName: true})
invoice.sync()

module.exports = invoice