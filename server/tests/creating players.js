const csv = require('csvtojson')
const axios = require('axios')
const path = require('path')
const csvFilePath = path.join(__dirname, '../../players.csv')

const read = async file => {
	const array = await csv().fromFile(file)
	return array
}

console.log(csvFilePath)

const players = read(csvFilePath)
