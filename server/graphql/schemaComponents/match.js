const gql = require('graphql-tag')

MatchModel = require('../../schemas/matchSchema').MatchModel

module.exports.types = gql`
    enum Result{
        Normal
        Other
        TBD
    }

    type Match {
        _id:ID
		Date: String
		Team1: Team
		Team2: Team
		Result: Result
		Winner: String
		Venue: String
    }
    
    extend type Query{
        getMatches:[Match]
    }
`

module.exports.resolvers = {
    Query:{
        async getMatches(){
            return MatchModel.find({})
        }
    }
}