const { Schema, model } = require('mongoose')

require('../server')()

const Player = require('./playerSchema').PlayerModel
const Game = require('./gameSchema').GameModel

const TeamSchema = new Schema({
	TeamName: { type: String, unique: true },
	TeamMembers: [
		{
			type: Schema.Types.ObjectId,
			ref: Player
		}
	],
	TeamSport: { type: Schema.Types.ObjectId, ref: Game }
})

const TeamModel = model('team', TeamSchema)

const team = TeamModel({
	TeamName: 'Team 2',
	TeamMembers: [
		'5de9abff9629b41bd48202bd',
		'5de9abff9629b41bd48202be',
		'5de9abff9629b41bd48202bf',
		'5de9abff9629b41bd48202c0'
	],
	TeamSport: '5ded3cd358e11466e4ca69f6'
})

async function execute() {
	const result = await TeamModel.find()
		.populate({
			path: 'TeamMembers',
			select: 'PlayerName House',
			populate: { path: 'House', select: 'HouseName' }
		})
		.populate({ path: 'TeamSport', select: 'TeamName' })

	return result
}

// execute()
module.exports.TeamModel = TeamModel
module.exports.TeamSchema = TeamSchema
