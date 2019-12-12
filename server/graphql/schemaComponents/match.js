const gql = require('graphql-tag')
module.exports.types = gql`
	enum Result {
		Normal
		Other
		TBD
	}

	input MatchInput {
		Date: String
		Team1: ID
		Team2: ID
		Result: Result
		Winner: String
		Venue: String
	}

	type Match {
		_id: ID!
		Date: String
		Team1: Team!
		Team2: Team
		Result: Result
		Winner: String
		Venue: String
	}

	extend type Query {
		matches: [Match]
		match(id: ID!): Match
	}

	extend type Mutation {
		createMatch(input: MatchInput!): Match
		updateMatch(id: ID!, input: MatchInput): Match
		deleteMatch(id: ID!): Match
	}
`

let TeamModel = require('../../schemas/teamSchema').TeamModel
let MatchModel = require('../../schemas/matchSchema').MatchModel

const options = { path: 'Team1 Team2', select: 'TeamName', model: TeamModel }

function processResult(result) {
	result.Date = new Date(result.Date)
	if (result.Result === 'Normal') {
		if (result.Winner === '1') result.Winner = result.Team1.TeamName
		else result.Winner = result.Team2.TeamName
	}

	return result
}

module.exports.resolvers = {
	Query: {
		async matches() {
			try {
				let results = await MatchModel.find({}).populate(options)
				results.forEach(result => {
					result = processResult(result)
				})
				return results
			} catch (err) {
				console.log(err)
				return err
			}
		},
		async match(_, args) {
			try {
				const id = args.id
				let result = await MatchModel.findOne({ _id: id }).populate(
					options
				)
				result = processResult(result)
				return result
			} catch (err) {
				console.log(err)
				return err
			}
		}
	},
	Mutation: {
		async createMatch(_, args) {
			try {
				let result = await new MatchModel(args.input).save()
				result = result.populate(options).execPopulate()
				return result
			} catch (err) {
				if (err.name === 'CastError') {
					err.message = 'Wring Date Format'
				}
				console.log(err)
				return err
			}
		},
		async updateMatch(_, args) {
			try {
				return await MatchModel.findByIdAndUpdate(
					{ _id: args.id },
					args.input
				).populate(options)
			} catch (err) {
				console.log(err)
				return err
			}
		},
		async deleteMatch(_, args) {
			try {
				return await MatchModel.findByIdAndDelete({
					_id: args.id
				}).populate(options)
			} catch (err) {
				console.log(err)
				return err
			}
		}
	}
}
