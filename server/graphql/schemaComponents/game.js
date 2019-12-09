const gql = require('graphql-tag')
module.exports.types = gql`
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
let GameModel = require('../../schemas/gameSchema').GameModel

module.exports.resolvers = {
	Query: {
		async games() {
			return await GameModel.find()
		},
		async game(_, args) {
			return await GameModel.find(args.input)
		}
	}
}
