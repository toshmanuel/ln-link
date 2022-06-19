const { Router } = require('express')
const controller = require('../controller/invoice-controller')
const router = Router()

router.get('/address/*', controller.getInvoices)
router.post('/', controller.addInvoice)
router.get('/:id', controller.getInvoiceById)
router.delete('/:id', controller.deleteInvoice)

module.exports = router