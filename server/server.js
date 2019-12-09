const mongoose = require('mongoose')

const connection = async () =>
	await mongoose.connect('mongodb://localhost:27017/sports', {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify:false,
		useCreateIndex: true,
	})

module.exports = connection