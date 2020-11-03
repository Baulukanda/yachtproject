const argon2 = require('argon2');
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { check, validationResult } = require('express-validator/check');

router.get('/', (req, res, next) => {
	res.render('login', {});
});

router.post('/', [
	check('username').not().isEmpty().trim().escape(),
	check('password').not().isEmpty().trim().escape()
], (req, res, next) => {
	const errors = validationResult(req);
	const incorretUserOrPass = 'Username or password is incorrect';

	if(!errors.isEmpty()) {
		res.render('login', { error: 'Username and password must be provided' });
	} else {
		User.findOne({name: req.body.username}).then((user) => {
			if(user) {
				argon2.verify(user.hash, req.body.password).then(match => {
					if (match) {
						req.session.userID = user._id;
						req.session.login = true;
						res.redirect((req.session.requestedAdminPage)
							? req.session.requestedAdminPage
							: '/admin/');
					} else {
						res.render('login',
							{error: incorretUserOrPass});
					}
				})
			} else {
				res.render('login',
					{error: incorretUserOrPass});
			}
		})
	};
});

// VERY MUCH TEMPORARY!!!!!!
// Don't delete though.
/*
router.get('/create/:username/:password', (req, res, next) => {
	argon2.hash(req.params.password).then((output) => {
		const user =new User({
			name: req.params.username,
			hash: output
		});

		user.save();

		console.log('created');
	})
});
*/

module.exports = router;