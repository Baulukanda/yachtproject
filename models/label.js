const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema = new Schema({
	_id: String,
	description: String,
	values: {
		type: Map,
		of: String
	}
});

module.exports = mongoose.model('Label', labelSchema);