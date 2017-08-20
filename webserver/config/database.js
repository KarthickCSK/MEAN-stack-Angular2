const crypto = require('crypto').randomBytes(256).toString('hex');
module.exports = {
	uri: 'mongodb://localhost/meanDB',
	secret: crypto,
	db:'meanDB'
}