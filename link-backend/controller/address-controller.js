const db = require('../config/db')
const Address = require('../model/address')
const Contact = require('../model/contact')

const getAddresses = async (req, res) => {
    await Address.findAll({
        where: { contactId: req.query.contactId }
    }).then(addresses => res.status(200).json(addresses))
        .catch(err => res.status(400).json({ message: "No address present for this contact at the momemt" }))
}

const getAddressById = async (req, res) => {

    await Address.findByPk(req.params.id, { include: ["contact"] }).then((address) => res.status(200).json(address)
    ).catch((error) => res.status(400).json({ message: "Address not found" }));
}

const addAddress = async (req, res) => {
    await Contact.findByPk(req.body.contactId).then(
        contact => {
            const address = Address.create({
                contact: contact,
                address: req.body.address,
                label: req.body.label,
                contactId: req.body.contactId
            },
            );
            res.status(201).json(address);
        }
    ).catch(err => {
        res.status(400).json(err.message);
    });
}

const deleteAddress = async (req, res) => {
    await Address.findByPk(req.params.id).then(
        address => {
            address.destroy();
            res.status(204).json({
                message: "Deleted successfully"
            })
        }
    ).catch(() => res.status(404).json({
        error: "Couldn't delete address"
    }))
}

module.exports = {
    getAddresses, getAddressById, addAddress, deleteAddress
}