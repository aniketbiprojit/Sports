const gql = require('graphql-tag')
module.exports = gql`
	input GameInput {
		GameName: String
		GameType: String
		GameCaption: String
	}

	type Game {
		_id: ID!
		GameName: String
		GameType: String
		GameCaption: String
	}

	extend type Query {
		games: [Game]
		game(input: GameInput): [Game]
	}
`
