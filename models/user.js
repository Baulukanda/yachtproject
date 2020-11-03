const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	hash: String
});

module.exports = mongoose.model('User', userSchema);