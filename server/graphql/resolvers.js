const mongoose = require('mongoose')

let HouseModel = require('../schemas/houseSchema').HouseModel
let GameModel = require('../schemas/gameSchema').GameModel
let PlayerModel = require('../schemas/playerSchema').PlayerModel
let TeamModel = require('../schemas/teamSchema').TeamModel

const getHouseId = async houseName => {
	try {
		const house = HouseModel
		const result = await house.findOne({ HouseName: houseName })
		return result['_id']
	} catch (err) {
		console.log(err)
		throw new Error('House not found')
	}
}

const getHouseIdSafe = async houseName => {
	const house = HouseModel
	const result = await house.findOne({ HouseName: houseName })
	return result
}

const resolvers = {
	Query: {
		async houses() {
			return await HouseModel.find()
		},
		async players() {
			return await PlayerModel.find().populate('House')
		},
		async player(_, args) {
			if (args.input.House) {
				args.input.House = await getHouseIdSafe(args.input.House)
			}
			return await PlayerModel.find(args.input).populate('House')
		},
		async games() {
			return await GameModel.find()
		},
		async game(_, args) {
			return await GameModel.find(args.input)
		},
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
		},
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
				}
				else{
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

module.exports = resolvers
