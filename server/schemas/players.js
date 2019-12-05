const mongoose = require('mongoose')

let Schema = mongoose.Schema
let PlayerSchema = new Schema({})

let Player = mongoose.model('Player', PlayerSchema, (Collection = 'Players'))

module.exports = Player
