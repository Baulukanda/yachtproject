const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const rentsController = require('../controllers/rents');
const { check, validationResult } = require('express-validator/check');
const config = require('../config');

router.get('/', (req, res) => {
	controller.setLanguage(req.session.language);
	const labels = controller.loadLabels();

	labels.then((labels) => {
		rentsController.getRentPeriods().then(result => {
			res.render('contact', {
				rentPeriods: result,
				labels: labels,
				navbarActiveSection: controller.activeNavbarLink(
					controller.navbarSections.CONTACT)
			});
		}).catch(err => {
			console.log(err);
		});
	});
});

router.post('/', [
	check('name').not().isEmpty().trim().escape(),
	check('phone').not().isEmpty().trim().escape(),
	check('email').not().isEmpty().trim().escape(),
	check('country').not().isEmpty().trim().escape(),
	check('numberOfGuests').not().isEmpty().trim().escape(),
	check('comment').trim().escape(),
	check('status').trim().escape()
], (req,res) => {
	const errors = validationResult(req);

	if(!errors.isEmpty()) {
		res.status(400);
		res.send();
	} else {
		rentsController.saveRequest(
			req.body.name,
			req.body.phone,
			req.body.email,
			req.body.country,
			req.body.numberOfGuests,
			req.body.comment,
			req.body.rentPeriods,
			req.body.status
		).then(() => {
			console.log('Requested Rent saved')
			res.status(200)
			res.send()

			if(!req.body.nomail) {
				req.app.mailer.send('mail/owner', {
					to: config.contact.ownerEmail,
					subject: 'Rent request',
				}, (err) => {
					if (err) {
						console.error(err);
					} else {
						console.log('Email sent to owner');
					}
				});

				req.app.mailer.send('mail/customer', {
					to: req.body.email,
					subject: 'Contact',
					customer: req.body.name
				}, (err) => {
					if (err) {
						console.error(err);
					} else {
						console.log('Email sent to customer');
					}
				})
			}
		}).catch((err) => {
			console.log(err);
			res.status(500);
			res.send();
		})
	}
});

module.exports = router;