const mongoose = require('mongoose')

const connection = async () =>
	await mongoose.connect('mongodb://localhost:27017/sports', {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})

module.exports = connection