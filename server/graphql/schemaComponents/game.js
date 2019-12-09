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

	extend type Mutation {
		createGame(input: GameInput): Game
		updateGame(id: ID!, input: GameInput): Game
		deleteGame(id: ID!): Game
	}
`
let GameModel = require('../../schemas/gameSchema').GameModel

const simplifyErr = async fn => {
	try {
		return await fn
	} catch (err) {
		console.log(err)
		return err
	}
}

module.exports.resolvers = {
	Query: {
		async games() {
			return await simplifyErr(GameModel.find())
		},
		async game(_, args) {
			return await GameModel.find(args.input)
		}
	},
	Mutation: {
		async createGame(_, args) {
			try {
				return await new GameModel(args.input).save()
			} catch (err) {
				if (err.code === 11000) {
					err.message = 'Game already exists.'
				} else {
					console.log(err)
				}
				return err
			}
		},
		async updateGame(_, args) {
			try {
				return await GameModel.findByIdAndUpdate(
					{ _id: args.id },
					args.input
				)
			} catch (err) {
				if (err.code === 11000) err.message = 'Game already exists'
				else console.log(err)
				return err
			}
		},
		async deleteGame(_,args) {
			try {
				return await GameModel.findByIdAndDelete({ _id: args.id })
			} catch (err) {
				console.log(err)
				return err
			}
		}
	}
}
