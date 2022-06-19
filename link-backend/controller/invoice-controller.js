const db = require('../config/db')
const Contact = require('../model/contact')

const getContacts = async (req, res) => {
    const contacts = await Contact.findAll()

    res.status(200).json(contacts)
}

const getContactById = async (req, res) => {
    const contactId = req.params.id;
    const contact = await Contact.findOne({
        where: {
            id: contactId,
        }
    });

    res.status(200).json(contact);
}

const addContact = async (req, res) => {
    const contact = await Contact.create({
        name: req.body.name
    });

    res.status(200).json(contact);
}

module.exports = {
    getContacts, getContactById, addContact,
}