const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', function(req, res, next) {
	controller.setLanguage(req.session.language);
	const labels = controller.loadLabels();

	labels.then((labels) => {
		res.render('photos', {
			title: 'Images',
			imgurls: [
				'/images/BMW.jpg',
				'/images/CR.jpg',
				'/images/download.jpg',
				'/images/future.jpg',
				'/images/maxresdefault.jpg',
				'/images/McLaren.jpg'],
			labels: labels,
			navbarActiveSection: controller.activeNavbarLink(
				controller.navbarSections.PHOTOS)
		});
	});
});

module.exports = router;