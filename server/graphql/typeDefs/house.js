const gql = require('graphql-tag')
module.exports = gql`
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
