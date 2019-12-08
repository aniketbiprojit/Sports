const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const gql = require('graphql-tag')

const graphqlHTTP = require('express-graphql')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/sports', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false
})

// GraphQL initialization
const graphql = require('graphql')
const makeExecutableSchema = require('graphql-tools').makeExecutableSchema

const typeDefs = gql`
	type House {
		_id: ID!
		HouseName: String
		Info: String
	}

	input HouseInput {
		HouseName: String!
		Info: String
	}

	input PlayerInput {
		PlayerName: String
		House: String
		Course: String
		Year: String
		About: String
	}

	type Player {
		_id: ID!
		PlayerName: String
		House: House
		Course: String
		Year: String
		About: String
	}

	type Query {
		houses: [House]
		players: [Player]
		player(name: String): [Player]
	}

	type Mutation {
		createPlayer(input: PlayerInput): Player
		updatePlayer(id: ID!, input: PlayerInput): Player
		deletePlayer(id: ID!): Player
	}
`

let HouseModel = mongoose.model(
	'house',
	require('../schemas/houseSchema').HouseSchema
)

let PlayerModel = mongoose.model(
	'player',
	require('../schemas/playerSchema').PlayerSchema
)

const getHouseId = async houseName => {
	try {
		const house = HouseModel
		const result = await house.findOne({ HouseName: houseName })
		return result['_id']
	} catch (err) {
		console.log(err)
		throw new Error('House not found')
	}
}

const resolvers = {
	Query: {
		async houses() {
			return await HouseModel.find()
		},
		async players() {
			return await PlayerModel.find().populate('House')
		},
		async player(root, args) {
			return await PlayerModel.find({ PlayerName: args.name }).populate(
				'House'
			)
		}
	},
	Mutation: {
		async createPlayer(_, args) {
			try {
				input = args.input
				input.House = await getHouseId(input.House)
				const player = new PlayerModel(input)
				const result = await player.save()
				return result
			} catch (err) {
				console.log(err)
				return err
			}
		},
		async updatePlayer(_, args) {
			try {
				input = args.input
				if (args.input.House) {
					args.input.House = await getHouseId(args.input.House)
				}
				return await PlayerModel.findByIdAndUpdate(
					{ _id: args.id },
					args.input
				).populate('House')
			} catch (err) {
				console.log(err)
				return err
			}
		},
		async deletePlayer(_, args) {
			try {
				input = args.input
				return await PlayerModel.findByIdAndDelete({
					_id: args.id
				}).populate('House')
			} catch (err) {
				console.log(err)
				return err
			}
		}
	}
}

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true
	})
)

async function execute(name) {
	const c = await getHouseId('Keen Kickers')
	console.log(c)
}

// execute('Sara Lake')

app.listen(port, () => console.log(`Listening on port ${port}`))
