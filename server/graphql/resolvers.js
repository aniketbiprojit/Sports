let resolvers = {}

resolvers = require('lodash').merge(
	resolvers,
	require('./schemaComponents/house').resolvers,
	require('./schemaComponents/player').resolvers,
	require('./schemaComponents/game').resolvers,
	require('./schemaComponents/team').resolvers,
	)

module.exports = resolvers
