const express = require('express')
const create = require('../schemas/playerSchema').createPlayer
const app = express.Router()
app.post('/add', async (req, res) => {
	try {
		await create(
			req.body.Name,
			req.body.House,
			req.body.Course,
			req.body.Year,
			req.body.About
		)
		res.sendStatus(200)
	} catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

module.exports.playerRoutes = app
