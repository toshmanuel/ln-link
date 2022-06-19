const Sequelize = require('sequelize');
const db = require('../config/db');


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
module.exports = Address