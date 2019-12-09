const gql = require('graphql-tag')

const house = require('./typeDefs/house')
const player = require('./typeDefs/player')
const game = require('./typeDefs/game')
const team = require('./typeDefs/team')

let typeDefs = gql`
	type Query {
		_empty: String
	}

	type Mutation {
		_empty:String	
	}
`
typeDefs = [typeDefs, house, player, game, team]
module.exports = typeDefs
