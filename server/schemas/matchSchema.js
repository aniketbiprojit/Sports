const { Schema, model } = require('mongoose')
require('./teamSchema')

const MatchSchema = new Schema({
	Date: Date,
	Team1: { type: Schema.Types.ObjectId, ref: 'Team' },
	Team2: { type: Schema.Types.ObjectId, ref: 'Team' },
	Result: { type: String, enum: ['Normal', 'Other', 'TBD'] },
	Winner: {type:String, enum:['1','2']},
	Venue: String
})

const Match = model('match', MatchSchema, 'matches')

module.exports.MatchSchema = MatchSchema
module.exports.MatchModel = Match
