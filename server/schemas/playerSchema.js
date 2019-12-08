const mongoose = require('mongoose')

require('../server')
require('./houseSchema')

let Schema = mongoose.Schema
let PlayerSchema = new Schema({
	PlayerName: String,
	House: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'House'
	},
	Course: String,
	Year: String,
	About: String
})

let Player = mongoose.model('Player', PlayerSchema)

const getHouseId = async houseName => {
	try {
		const house = require('./houseSchema').HouseModel
		const result = await house.findOne({ HouseName: houseName })
		return result['_id']
	} catch (err) {
		throw new Error('House not found')
	}
}

const createPlayer = async (playerName, house, course, year, about) => {
	try {
		house = await getHouseId(house)
		const player = new Player({
			PlayerName: playerName,
			House: house,
			Course: course,
			Year: year,
			About: about
		})
		const result = await player.save()
	} catch (err) {
		console.log(err)
		throw new Error(`Create Player Failed ${playerName}`)
	}
}

const deletePlayer = async playerId => {
	try {
		if (playerId) {
			const result = await Player.findByIdAndDelete(playerId)
			console.log(result)
		} else throw new Error('Failed to define player id')
	} catch (err) {
		console.log(err)
		throw new Error(`Failed to delete player of id ${playerId}`)
	}
}

const getPlayer = async playerId => {
	try {
		const result = await Player.findById(playerId)
		return result
	} catch (err) {
		console.log(err)
	}
}

const getPlayers = async () => {
	try {
		const result = await Player.find()
		return result
	} catch (err) {
		console.log(err)
	}
}

module.exports.PlayerModel = Player
module.exports.PlayerSchema = PlayerSchema
module.exports.createPlayer = createPlayer
module.exports.deletePlayer = deletePlayer
module.exports.getPlayer = getPlayer
module.exports.getPlayers = getPlayers