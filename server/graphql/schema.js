const express = require('express')
const app = express.Router()

const graphqlHTTP = require('express-graphql')

// GraphQL initialization
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true
	})
)

module.exports = app
// execute('Sara Lake')

// app.listen(port, () => console.log(`Listening on port ${port}`))
