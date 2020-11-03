const mongoose = require('mongoose')
const Schema = mongoose.Schema

const rentSchema = new Schema({
	name: String,
	phone: String,
	email: String,
	country: String,
	numberOfGuests: Number,
	comment: String,
	rentPeriods: [{type: Schema.Types.ObjectId, ref: 'RentPeriod'}],
	status: String
})

module.exports = mongoose.model('Rent', rentSchema)