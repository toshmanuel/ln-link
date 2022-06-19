const Sequelize = require('sequelize');
const db = require('../config/db');
const Address = require('./address');

class Contact extends Sequelize.Model {}
Contact.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, {
    modelName: "contact",
    sequelize: db,
})

Contact.hasMany(Address)
Address.belongsTo(Contact)
module.exports = Contact