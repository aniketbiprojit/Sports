const gql = require('graphql-tag')
module.exports.types = gql`
	enum Result {
		Normal
		Other
		TBD
	}

	type Match {
		_id: ID
		Date: String
		Team1: Team
		Team2: Team
		Result: Result
		Winner: String
		Venue: String
	}

	extend type Query {
		getMatches: [Match]
	}
`

let TeamModel = require('../../schemas/teamSchema').TeamModel
let MatchModel = require('../../schemas/matchSchema').MatchModel

module.exports.resolvers = {
	Query: {
		async getMatches() {
			const results = await MatchModel.find({}).populate({
				path: 'Team1 Team2',
				select: 'TeamName',
				model: TeamModel
			})
			results.forEach(result => {
				result.Date = new Date(result.Date)
				if (result.Result === 'Normal') {
					if (result.Winner === '1') result.Winner = 'Team1'
					else result.Winner = 'Team2'
				}
			})
			return results
		}
	}
}
