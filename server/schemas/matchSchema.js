const { Schema, model } = require('mongoose')
require('./teamSchema')

const MatchSchema = new Schema({
	Date: Date,
	Team1: { type: Schema.Types.ObjectId, ref: 'Team' },
	Team2: { type: Schema.Types.ObjectId, ref: 'Team' },
	Result: { type: String, enum: ['Normal', 'Other', 'TBD'] },
	Winner: String,
	Venue: String
})

const Match = model('match', MatchSchema, 'matches')

async function execute() {
	const match = new Match({
		Date: new Date(),
		Team1: '5ded8d4b112e634394406128',
		Team2: '5ded8d7a0670412208d51fd2',
		Result: 'Normal',
		Winner: '1',
		Venure: ''
	})
	await match.save()
	console.log(match)
}

// execute()

module.exports.MatchSchema = MatchSchema
module.exports.MatchModel = Match
