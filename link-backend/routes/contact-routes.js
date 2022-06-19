const { Router } = require('express')
const controller = require('../controller/contact-controller')
const router = Router()

router.get('/', controller.getContacts)
router.post('/', controller.addContact)
router.get('/:id', controller.getContactById)
router.delete('/:id', controller.deleteContact)

module.exports = router