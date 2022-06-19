const { Router } = require('express')
const controller = require('../controller/address-controller')
const router = Router()

router.get('/*', controller.getAddresses)
router.post('/', controller.addAddress)
router.get('/:id', controller.getAddressById)
// router.delete('/:id', controller.deleteContact)

module.exports = router