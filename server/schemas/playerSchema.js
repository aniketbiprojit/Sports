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

module.exports.PlayerModel = Player
module.exports.PlayerSchema = PlayerSchema