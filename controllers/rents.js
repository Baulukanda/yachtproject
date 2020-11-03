const Rent = require('../models/rent');
const RentPeriod = require('../models/rentPeriod');

exports.saveRequest = function(name, phone, email, country, numberOfGuests, comment, rentPeriodIds, status="requested") {
	const rent = new Rent({
		name: name,
		phone: phone,
		email: email,
		country: country,
		numberOfGuests: numberOfGuests,
		comment: comment,
		rentPeriods: rentPeriodIds,
		status: status
	});
	return new Promise((resolve, reject) => {
		rent.save().then(rent => {
			if (status === "accepted") {
				// Go through rentPeriods, and set their rent property to this rents id.
				let promiseArray = [];
				for (rentPeriodId of rentPeriodIds) {
					promiseArray.push(RentPeriod.findByIdAndUpdate(rentPeriodId, {rent:rent._id}, {useFindAndModify: false}));
				}
				Promise.all(promiseArray).then(() => {
					resolve(rent);
				});
			}
			else return resolve(rent);
		}).catch(err => {
			reject(err);
		});
	});
};

exports.createRentPeriod = function(startDate, endDate) {
	const rentPeriod = new RentPeriod({
		startDate: startDate,
		endDate: endDate,
		rent: null
	});
	return rentPeriod.save();
};

exports.getRents = function() {
	return Rent.find().populate('rentPeriods').exec();
};

exports.getRentPeriods = function() {
	return RentPeriod.find();
}

exports.deleteRent = function(id){
	return new Promise((resolve, reject) => {
		exports.getRentById(id).then(rent => {
			let rentPeriods = rent.rentPeriods;
			let promiseArray = [];
			if (rent.status === "accepted" && rentPeriods) {
				for (rentPeriod of rentPeriods) {
					promiseArray.push(RentPeriod.findByIdAndUpdate(rentPeriod, {rent:null}, {useFindAndModify: false}));
				}
			}
			Promise.all(promiseArray).then(() => {
				Rent.deleteOne({_id:id}).exec().then(() => {
					resolve();
				});
			}).catch(err => {
				reject(err);
			});
		}).catch(err => {
			reject(err);
		});
	});
}

exports.getRentById = function(id) {
	return Rent.findOne({_id: id}).exec();
}

exports.updateRent = function (rentId, input) {
	return new Promise((resolve, reject) => {
		Rent.findByIdAndUpdate(rentId, input, {useFindAndModify: false}).then(() => {
			let promiseArray = [];
			if(input['status'] === 'accepted') {
				for (rentPeriodId of input['rentPeriods']) {
					// TODO: Doesn't update rentPeriods for this rent.
					promiseArray.push(RentPeriod.findByIdAndUpdate(rentPeriodId, {rent:rentId}, {useFindAndModify: false}));
				}
			}
			else { // If new status is either rejected or requested.
				for (rentPeriodId of input['rentPeriods']) {
					promiseArray.push(RentPeriod.findOneAndUpdate({_id: rentPeriodId, rent: rentId}, {rent: null}, {useFindAndModify: false}));
				}
			}
			Promise.all(promiseArray).then(() => {
				resolve();
			}).catch(err => {
				reject("Error updating rentPeriods, please check rentPeriods for correctness");
			});
		}).catch(err => {
			reject("Failed to update rent");
		});
	});
};