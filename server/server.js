const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/xseed', {
	useUnifiedTopology: true,
	useNewUrlParser: true
})
