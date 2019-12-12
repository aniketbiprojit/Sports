let resolvers = {}

resolvers = require('lodash').merge(
	resolvers,
	require('./schemaComponents/house').resolvers,
	require('./schemaComponents/player').resolvers,
	require('./schemaComponents/game').resolvers,
	require('./schemaComponents/team').resolvers,
	require('./schemaComponents/match').resolvers,
	)

module.exports = resolvers
