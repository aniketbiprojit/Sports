const express = require('express')
const server = require('./server')

const schema = require('./graphql/schema')

const port = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

async function execute() {
	try {
		const connection = await server()
		connection === require('mongoose')
	} catch (err) {
		console.log(err)
	}
}

execute()

require('./schemas/teamSchema')

app.use('/', schema)

app.listen(port, () => console.log(`Listening on port ${port}`))
