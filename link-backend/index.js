const express  = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const invoiceRoute = require('./routes/invoice-routes')
const contactRoute = require('./routes/contact-routes')
const addressRoute = require('./routes/address-routes')
const db = require('./config/db')
db.authenticate().then(() => 
    console.log('authentication successful'))
    .catch(err => console.log(err.message))

db.sync();
app.use(cors())
app.use(express.json())


app.use('/api/v1/contacts', contactRoute)
app.use('/api/v1/addresses', addressRoute)
app.use('/api/v1/invoices', invoiceRoute)

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server has started listening on port ' + process.env.SERVER_PORT)
})
