const gql = require('graphql-tag')

const house = require('./schemaComponents/house')
const player = require('./schemaComponents/player')
const game = require('./schemaComponents/game')
const team = require('./schemaComponents/team')
const match = require('./schemaComponents/match')

let typeDefs = gql`
	type Query {
		_empty: String
	}

	type Mutation {
		_empty: String
	}
`
typeDefs = [
	typeDefs,
	house.types,
	player.types,
	game.types,
	team.types,
	match.types
]
module.exports = typeDefs
