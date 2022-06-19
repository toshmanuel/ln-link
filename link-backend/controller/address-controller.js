const db = require('../config/db')
const Address = require('../model/address')
const Contact = require('../model/contact')

const getAddresses = async (req, res) => {
    await Address.findAll({
        where: { contact: req.params.contact }
    }).then(addresses => res.status(200).json(addresses))
        .catch(err => res.status(400).json({ message: "No address present for this contact at the momemt" }))
}

const getAddressById = async (req, res) => {

    await Address.findOne({
        where: {
            id: contactId,
        }
    }).then((address) => res.status(200).json(address)
    ).catch((error) => res.status(400).json({ message: "Address not found" }));
}

const addAddress = async (req, res) => {
    const contact = await Contact.findByPk(req.body.contactId);
    
    await Address.create({
        contact: contact,
        address: req.body.address,
        label: req.body.label,
    }, {
        include: [Contact]
    }).then(address => {res.status(201).json(address)});

    
}

const deleteContact = async (req, res) => {
    const contactId = req.params.id;

    const contact = await Contact.findOne({
        where: { id: contactId }
    })
    const deleteContact = await contact.destroy();

    res.status(204).json(deleteContact);
}

module.exports = {
    getAddresses, getAddressById, addAddress, deleteContact
}