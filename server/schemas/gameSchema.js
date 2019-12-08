const mongoose = require('mongoose')

const server = require('../server')()

const GameSchema = new mongoose.Schema({
	GameName: {type:String},
    GameType: String, // Indoor or Outdoor
    GameCaption: String
})

const GameModel = new mongoose.model('game', GameSchema)

module.exports.GameSchema = GameSchema
module.exports.GameModel = GameModel
