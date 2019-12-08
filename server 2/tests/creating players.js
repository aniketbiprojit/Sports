const csv = require('csvtojson')
const axios = require('axios')
const path = require('path')
const csvFilePath = path.join(__dirname, '../../players.csv')

const read = async file => {
	const array = await csv().fromFile(file)
	return array
}

console.log(csvFilePath)

async function createPlayer(player, i) {
	try {
		const response = await axios.post(
			'http://localhost:8080/player/add',
			player
		)
	} catch (err) {
		console.log(i)
		throw new Error("Couldn't create new player.")
	}
}

const execute = async () => {
	i = 0
	try {
		const players = await read(csvFilePath)
		await players.forEach(player => {
			i += 1
			createPlayer(player, i)
		})
	} catch (err) {
		console.log(err)
	}
}
execute()
