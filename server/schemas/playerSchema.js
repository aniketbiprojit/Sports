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
		console.log(result)
	} catch (err) {
		console.log(err)
		throw new Error('Create Player Failed')
	}
}

module.exports.PlayerModel = Player
module.exports.PlayerSchema = PlayerSchema
module.exports.createPlayer = createPlayer