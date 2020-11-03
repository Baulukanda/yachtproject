const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentPeriodSchema = new Schema({
	startDate: Number,
	endDate: Number,
	rent: {type: Schema.Types.ObjectId, ref: 'Rent'}
});

module.exports = mongoose.model('RentPeriod', rentPeriodSchema);