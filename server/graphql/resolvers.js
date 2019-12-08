const mongoose = require('mongoose')

let HouseModel = require('../schemas/houseSchema').HouseModel
let GameModel = require('../schemas/gameSchema').GameModel
let PlayerModel = require('../schemas/playerSchema').PlayerModel

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

const getHouseIdSafe = async houseName=>{
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

module.exports = resolvers
