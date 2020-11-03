const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');


router.get('/en', function(req, res, next) {
	req.session.language = controller.languages.ENGLISH;
	res.redirect(req.session.previousURL);
});

router.get('/da', function(req, res, next) {
	req.session.language = controller.languages.DANISH;
	res.redirect(req.session.previousURL);
});

router.get('/sv', function(req, res, next) {
	req.session.language = controller.languages.SWEDISH;
	res.redirect(req.session.previousURL);
});

router.get('/no', function(req, res, next) {
	req.session.language = controller.languages.NORWEGIAN;
	res.redirect(req.session.previousURL);
});

router.get('/ru', function(req, res, next) {
	req.session.language = controller.languages.RUSSIAN;
	res.redirect(req.session.previousURL);
});

module.exports = router;
