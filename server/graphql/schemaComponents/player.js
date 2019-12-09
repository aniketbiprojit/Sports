const gql = require('graphql-tag')
module.exports.types = gql`
	input PlayerInput {
		PlayerName: String
		House: String
		Course: String
		Year: String
		About: String
	}

	type Player {
		_id: ID!
		PlayerName: String
		House: House
		Course: String
		Year: String
		About: String
	}

	extend type Query {
		players: [Player]
		player(input: PlayerInput): [Player]
	}

	extend type Mutation {
		createPlayer(input: PlayerInput): Player
		updatePlayer(id: ID!, input: PlayerInput): Player
		deletePlayer(id: ID!): Player
	}
`

let PlayerModel = require('../../schemas/playerSchema').PlayerModel
let { getHouseId, getHouseIdSafe } = require('./house').get

module.exports.resolvers = {
	Query: {
		async players() {
			return await PlayerModel.find().populate('House')
		},
		async player(_, args) {
			if (args.input.House) {
				args.input.House = await getHouseIdSafe(args.input.House)
			}
			return await PlayerModel.find(args.input).populate('House')
		}
	},
	Mutation: {
		async createPlayer(_, args) {
			try {
				input = args.input
				input.House = await getHouseId(input.House)
				const player = new PlayerModel(input)
				const result = await player.save()
				return result
			} catch (err) {
				console.log(err)
				return err
			}
		},
		async updatePlayer(_, args) {
			try {
				input = args.input
				if (args.input.House) {
					args.input.House = await getHouseId(args.input.House)
				}
				return await PlayerModel.findByIdAndUpdate(
					{ _id: args.id },
					args.input
				).populate('House')
			} catch (err) {
				console.log(err)
				return err
			}
		},
		async deletePlayer(_, args) {
			try {
				input = args.input
				return await PlayerModel.findByIdAndDelete({
					_id: args.id
				}).populate('House')
			} catch (err) {
				console.log(err)
				return err
			}
		}
	}
}
