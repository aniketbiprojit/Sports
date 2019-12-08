const { Schema, model } = require('mongoose')

require('../server')()

const Player = require('./playerSchema').PlayerModel
const Game = require('./gameSchema').GameModel

const TeamSchema = new Schema({
	TeamName: String,
	TeamMembers: [
		{
			TeamMember: {
				type: Schema.Types.ObjectId,
				ref: Player
			}
		}
	],
	TeamSport: { type: Schema.Types.ObjectId, ref: Game }
})

const TeamModel = model('team', TeamSchema)

const team = TeamModel({
	TeamName: 'Team 1',
	TeamMembers: [
		{ TeamMember: '5de9abfb9629b41bd4820291' },
		{ TeamMember: '5de9abfd9629b41bd4820295' },
		{ TeamMember: '5de9abfc9629b41bd4820293' },
		{ TeamMember: '5de9abfc9629b41bd4820292' }
	],
	TeamSport: '5ded3cd358e11466e4ca69f6'
})

const House = require('./houseSchema').HouseModel

async function execute() {
	const result = await TeamModel.find()
		.populate({
			path: 'TeamMembers.TeamMember',
			select: 'PlayerName House',
			populate: { path: 'House', select: 'HouseName' }
		})
		.populate('TeamSport')
	console.log(result)
	return result
}

execute()
