const Label = require('../../models/label');

exports.getLabels = () => {
	const labels = Label.find({}).exec();

	return new Promise((resolve, reject) => {
		labels.then((labels) => {
			resolve(labels);
		}).catch((err) => {
			reject(err);
		});
	});
};

exports.getLabel = (id) => {
	const label = Label.findOne({ _id: id }).exec();

	return new Promise((resolve, reject) => {
		label.then((label) => {
			resolve(label);
		}).catch((err) => {
			reject(err);
		});
	});
};

exports.updateLabel = (values) => {
	return new Promise((resolve, reject) => {
		const result = Label.findOneAndUpdate({ _id: values._id }, { $set: values }).exec();

		result.then(() => {
			resolve();
		}).catch((err) => {
			reject(err);
		});
	});
}

// Temp function
exports.createLabel = (id, description, values) => {
	const label = new Label({
		_id: id,
		description: description,
		values: values
	})

	label.save();
};