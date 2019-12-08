const {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLList
} = require('graphql')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/sports', {
	useUnifiedTopology: true,
	useNewUrlParser: true
})

// const HouseModel =
const HouseModel = mongoose.model(
	'house',
	require('../schemas/houseSchema').HouseSchema
)

let HouseType = new GraphQLObjectType({
	name: 'House',
	fields: {
		id: { type: GraphQLID },
		HouseName: { type: GraphQLString },
		Info: { type: GraphQLString }
	}
})

let HouseSchema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: {
			houses: {
				type: GraphQLList(HouseType),
				resolve: async (root, args, context, info) => {
					return await HouseModel.find().exec()
				}
			}
		}
	})
})

async function execute(query) {
	console.log('ok')
	const result = await graphql(HouseSchema, query, global)
	console.log(result.data)
}

try {
	execute('{houses{HouseName,Info}}')
} catch (err) {
	console.log(err)
}
