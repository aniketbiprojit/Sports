const gql = require('graphql-tag')

// const mongoose = require('mongoose')

// let HouseModel = mongoose.model(
// 	'house',
// 	require('../schemas/houseSchema').HouseSchema
// )

// let PlayerModel = require('../schemas/playerSchema').PlayerModel

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

	input TeamInput {
		TeamName: String!
		TeamMembers: [String]
		TeamSport: String
	}

	type Team {
		_id: ID!	
		TeamName: String
		TeamMembers: [Player]
		TeamSport: Game
	}

	type Query {
		houses: [House]
		players: [Player]
		player(input: PlayerInput): [Player]
		games: [Game]
		game(input: GameInput): [Game]
		teams: [Team]
	}

	type Mutation {
		createPlayer(input: PlayerInput): Player
		updatePlayer(id: ID!, input: PlayerInput): Player
		deletePlayer(id: ID!): Player
		addTeam(input: TeamInput): Team
	}
`

module.exports = typeDefs
