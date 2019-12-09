const gql = require('graphql-tag')
module.exports = gql`
	input TeamInput {
		TeamName: String
		TeamMembers: [String]
		TeamSport: String
	}

	type Team {
		_id: ID!
		TeamName: String
		TeamMembers: [Player]
		TeamSport: Game
    }
    
    extend type Query{
		teams: [Team]

    }

    extend type Mutation {
		
		addTeam(input: TeamInput): Team
		addTeamPlayer(id: ID!, input: ID!): Team
		removeTeamPlayer(id: ID!, input: ID!): Team
		updateTeam(id: ID!, input: TeamInput): Team
	}
`
