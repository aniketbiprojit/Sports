const mongoose = require('mongoose')

let Schema = mongoose.Schema
let HouseSchema = new Schema({
	HouseName: String,
	Info: String
})

let House = mongoose.model('House', HouseSchema)

async function createHouse(houseName, houseInfo) {
	try {
		houseInfo = JSON.stringify(houseInfo)

		const house = new House({
			HouseName:houseName,
			Info:houseInfo
		})
		const result = await house.save()
		console.log(result)
	} catch (err) {
		console.log(err)
	}
}

module.exports.HouseModel = House
module.exports.HouseSchema = HouseSchema
