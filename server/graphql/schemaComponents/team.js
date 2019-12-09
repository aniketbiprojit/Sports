const gql = require('graphql-tag')
module.exports.types = gql`
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
let TeamModel = require('../../schemas/teamSchema').TeamModel
let GameModel = require('../../schemas/gameSchema').GameModel

module.exports.resolvers={
	Query: {
		async teams() {
			return await TeamModel.find()
				.populate({
					path: 'TeamMembers',
					select: 'PlayerName House',
					populate: { path: 'House', select: 'HouseName' }
				})
				.populate({
					path: 'TeamSport',
					select: 'GameName',
					model: GameModel
				})
		}
	},
	Mutation: {
		async addTeam(_, args) {
			try {
				input = args.input
				console.log(args.input)
				const team = new TeamModel(args.input)
				const result = await team.save()
				return result
			} catch (err) {
				if (err.code === 11000) {
					err.message = 'Team already exists.'
				} else {
					console.log(err)
				}
				return err
			}
		},
		async addTeamPlayer(_, args) {
			try {
				let team = await TeamModel.findById(args.id)
				team.TeamMembers.push(args.input)
				await team.save()
				team = await TeamModel.findById(args.id)
					.populate({
						path: 'TeamMembers',
						populate: { path: 'House', select: 'HouseName' }
					})
					.populate({
						path: 'TeamSport',
						select: 'TeamName',
						model: GameModel
					})
				return team
			} catch (err) {
				console.log(err)
				return err
			}
		},
		async removeTeamPlayer(_, args) {
			try {
				let team = await TeamModel.findById(args.id)
				team.TeamMembers = team.TeamMembers.filter(
					elem => elem != args.input
				)
				await team.save()
				team = await TeamModel.findById(args.id)
					.populate({
						path: 'TeamMembers',
						populate: { path: 'House', select: 'HouseName' }
					})
					.populate({
						path: 'TeamSport',
						select: 'TeamName',
						model: GameModel
					})
				return team
			} catch (err) {
				console.log(err)
				return err
			}
		},
		async updateTeam(_, args) {
			try {
				return await TeamModel.findByIdAndUpdate(
					{ _id: args.id },
					args.input
				)
					.populate({
						path: 'TeamMembers',
						populate: { path: 'House', select: 'HouseName' }
					})
					.populate({
						path: 'TeamSport',
						select: 'TeamName',
						model: GameModel
					})
			} catch (err) {
				if (err.code === 11000) {
					err.message = 'Team already exists.'
				} else {
					console.log(err)
				}
				throw err
			}
		}
	}
}