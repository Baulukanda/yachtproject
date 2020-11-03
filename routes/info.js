const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', (req, res) => {
	controller.setLanguage(req.session.language);
	const labels = controller.loadLabels();

	labels.then((labels) => {
		res.render('info', {
			labels: labels,
			navbarActiveSection: controller.activeNavbarLink(
				controller.navbarSections.INFO)
		});		
	});
})

module.exports = router;