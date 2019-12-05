const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = process.env.PORT || 8080

app.listen(port,`Listening on port ${8080}`)