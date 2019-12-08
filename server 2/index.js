const express = require('express')
Player = require('./schemas/playerSchema')
const app = express()

require('./server')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 8080

app.use('/player',require('./routes/playerRoutes').playerRoutes)

app.listen(port, () => console.log(`Listening on port ${port}`))
