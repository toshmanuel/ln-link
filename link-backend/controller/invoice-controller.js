const db = require('../config/db')
const Address = require('../model/address')
const Invoice = require('../model/invoice')

const getInvoices = async (req, res) => {
    await Invoice.findAll({
        where: { addressId: req.query.addressId }
    }).then(invoices => res.status(200).json(invoices))
        .catch(err => res.status(400).json({ message: "No invoice present for this address at the momemt" }))
}

const getInvoiceById = async (req, res) => {

    await Invoice.findByPk(req.params.id, { include: ["address"] })
        .then((invoice) => res.status(200).json(invoice))
        .catch((error) => res.status(400).json({ message: "invoice not found" }));
}

const addInvoice = async (req, res) => {
    await Address.findByPk(req.body.contactId)
        .then(
            address => {
                const invoice = Invoice.create({
                    amount: req.body.amount,
                    recipient: req.body.recipient,
                    description: req.body.description,
                    addressId: req.body.addressId,
                },
                );
                res.status(201).json(invoice);
            }
        ).catch(err => {
            res.status(400).json(err.message);
        });
}

const deleteInvoice = async (req, res) => {
    await Invoice.findByPk(req.params.id).then(
        invoice => {
            invoice.destroy();
            res.status(204).json({
                message: "Deleted successfully"
            })
        }
    ).catch(() => res.status(404).json({
        error: "Couldn't delete invoice"
    }))
}

module.exports = {
    getInvoices, getInvoiceById, addInvoice, deleteInvoice
}