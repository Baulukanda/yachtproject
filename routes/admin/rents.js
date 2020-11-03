const controller = require('../../controllers/controller');
const express = require('express');
const rentsController = require('../../controllers/rents');
const router = express.Router();

router.get('/', (req, res, next) => {
	rentsController.getRents().then(rentList => {
		const requestedList = [];
		const acceptedList = [];
		const rejectedList = [];
		for (element of rentList) {
			if (element.status === "requested") requestedList.push(element);
			else if (element.status === "accepted") acceptedList.push(element);
			else if (element.status === "rejected") rejectedList.push(element);
		}
		res.render('admin/rents', {requestedList: requestedList, acceptedList:acceptedList, rejectedList: rejectedList});
	}).catch(err => {
		console.error(err);
		res.render('error', {error: err});
	});
});


/** GET createRent page */
router.get('/create', (req, res, next) => {
	rentsController.getRentPeriods().then(rentPeriods => {
		res.render('admin/updateRent', {rentPeriods: rentPeriods});
	}).catch(err => {
		console.log(err);
	});
});

router.post('/create', (req,res) => {
	rentsController.saveRequest(
		req.body.name,
		req.body.phone,
		req.body.email,
		req.body.country,
		req.body.numberOfGuests,
		req.body.comment,
		req.body.rentPeriods,
		req.body.status
	)
	.then(() =>{
		res.status(200)
		res.send()
	})
	.catch(err => console.log(err))
});
	
/** PUT updateRent page */
router.put('/id/:id', (req,res, next) => {
	let input = {
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		country: req.body.country,
		numberOfGuests: req.body.numberOfGuests,
		comment: req.body.comment,
		rentPeriods: req.body.rentPeriods,
		status: req.body.status
	};
	rentsController.updateRent(req.params.id, input).then(() =>{
		res.status(200);
		res.send();
	}).catch(err => {
		res.status(400);
		res.send();
		console.error(err)
	});
});

/*  deleteRent. */
router.delete('/id/:id', (req, res, next) => {
	rentsController.deleteRent(req.params.id).then(() => {
		res.json({message:"deleted"});
	}).catch(err => {
		res.send(err);
	})
});


/* GET updateRent page. */
router.get('/id/:id', (req, res, next) => {
	rentsController.getRentById(req.params.id).then(rent => {
		rentsController.getRentPeriods().then(rentPeriods => {
			res.render('admin/updateRent', {rent: rent, rentPeriods: rentPeriods});
			
		}).catch(err => {
			console.error(err);
			res.render('error', {error: err});
		});
	}).catch(err => {
		console.error(err);
		res.render('error', {error: err});
	});	
});	

module.exports = router;