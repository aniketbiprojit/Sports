const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
	GameName: {type:String},
    GameType: String, // Indoor or Outdoor
    GameCaption: String
})

const Game = new mongoose.model('game', GameSchema)

module.exports.GameSchema = GameSchema
module.exports.GameModel = Game