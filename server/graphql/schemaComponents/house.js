const gql = require('graphql-tag')
module.exports.types = gql`
	type House {
		_id: ID!
		HouseName: String
		Info: String
	}

	input HouseInput {
		HouseName: String!
		Info: String
	}

	extend type Query {
		houses: [House]
	}
`

let HouseModel = require('../../schemas/houseSchema').HouseModel

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

const getHouseIdSafe = async houseName => {
	const house = HouseModel
	const result = await house.findOne({ HouseName: houseName })
	return result
}

module.exports.resolvers = {
	Query: {
		async houses() {
			return await HouseModel.find()
		}
	}
}

module.exports.get = {getHouseId,getHouseIdSafe}
