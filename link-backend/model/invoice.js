const Sequelize = require('sequelize');
const db = require('../config/db');


class Invoice extends Sequelize.Model {}
Invoice.init({
    amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    recipient: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.BOOLEAN,
        default: false,
    },
    lighningInvoiceHash: {
        type: Sequelize.STRING,
        default: false,
    },

    
}, {
    modelName: "invoice",
    sequelize: db,
})
module.exports = Invoice