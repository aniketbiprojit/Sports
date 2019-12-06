const express = require('express')
Player = require('./schemas/playerSchema')
const app = express()

require('./server')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 8080

app.get('/')

app.listen(port, () => console.log(`Listening on port ${port}`))
