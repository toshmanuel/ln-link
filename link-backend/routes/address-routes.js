const { Router } = require('express')
const controller = require('../controller/address-controller')
const router = Router()

router.get('/contact/*', controller.getAddresses)
router.post('/', controller.addAddress)
router.get('/:id', controller.getAddressById)
router.delete('/:id', controller.deleteAddress)

module.exports = router