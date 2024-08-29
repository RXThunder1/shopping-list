const express = require('express')
const items = require('./fakeDb')
const routes = require('./routes')

const app = express()
app.use(express.json())
app.use('/items', routes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app