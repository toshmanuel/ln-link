const db = require('../config/db')
const Contact = require('../model/contact')

const getContacts = async (req, res) => {
    const contacts = await Contact.findAll()

    res.status(200).json(contacts)
}

const getContactById = async (req, res) => {
    const contactId = req.params.id;
    const contact = await Contact.findByPk(contactId);

    res.status(200).json(contact);
}

const addContact = async (req, res) => {
    await Contact.create({
        name: req.body.name
    }).then(contact => {
        res.status(200).json(contact);
    }).catch((err) => {
        res.status(400).json(err.errors[0].message);
    });


    
}

const deleteContact = async (req, res) => {
    const contactId = req.params.id;

    const contact = await Contact.findByPk(contactId);
    const deleteContact = await contact.destroy();

    res.status(204).json(deleteContact);
}

module.exports = {
    getContacts, getContactById, addContact, deleteContact
}