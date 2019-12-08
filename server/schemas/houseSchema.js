const mongoose = require('mongoose')

let Schema = mongoose.Schema
let HouseSchema = new Schema({
	HouseName: String,
	Info: String
})

let House = mongoose.model('House', HouseSchema)

module.exports.HouseModel = House
module.exports.HouseSchema = HouseSchema
