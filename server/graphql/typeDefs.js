const gql = require('graphql-tag')

const mongoose = require('mongoose')

let HouseModel = mongoose.model(
	'house',
	require('../schemas/houseSchema').HouseSchema
)

let PlayerModel = mongoose.model(
	'player',
	require('../schemas/playerSchema').PlayerSchema
)

const typeDefs = gql`
	type House {
		_id: ID!
		HouseName: String
		Info: String
	}

	input HouseInput {
		HouseName: String!
		Info: String
	}

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

	type Query {
		houses: [House]
		players: [Player]
		player(input:PlayerInput): [Player]
		games: [Game]
		game(input: GameInput): [Game]
	}

	type Mutation {
		createPlayer(input: PlayerInput): Player
		updatePlayer(id: ID!, input: PlayerInput): Player
		deletePlayer(id: ID!): Player
	}
`

module.exports = typeDefs
