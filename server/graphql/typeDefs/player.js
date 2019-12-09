const gql = require('graphql-tag')
module.exports = gql`
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
