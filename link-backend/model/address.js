const Sequelize = require('sequelize');
const db = require('../config/db');
const Invoice = require('./invoice')


class Address extends Sequelize.Model {}
Address.init({
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    label: { type: Sequelize.STRING}
}, {
    modelName: "address",
    sequelize: db,
})

Address.hasMany(Invoice, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Invoice.belongsTo(Address)
module.exports = Address