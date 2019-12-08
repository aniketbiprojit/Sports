const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const gql = require('graphql-tag')

const graphqlHTTP = require('express-graphql')

const mongoose = require('./node_modules/mongoose/index')
mongoose.connect('mongodb://localhost:27017/sports', {
	useUnifiedTopology: true,
	useNewUrlParser: true
})

// GraphQL initialization
const graphql = require('graphql')
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema

const typeDefs = gql`
	type House {
		_id: ID!
		HouseName: String
		Info: String
	}
	type Query {
		houses: [House]
	}
`

const resolvers = {
	Query: {
		async houses() {
			return await mongoose
				.model('house', require('../schemas/houseSchema').HouseSchema)
				.find()
		}
	}
}

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

app.listen(port, () => console.log(`Listening on port ${port}`))
