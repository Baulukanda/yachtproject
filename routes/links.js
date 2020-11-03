const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', function(req, res, next) {
	controller.setLanguage(req.session.language);
	const labels = controller.loadLabels();

	labels.then((labels) => {
		res.render('links', {
			links: [
				{
					title: "DR",
					image: "/images/hc1.jpg",
					desc: "Danmarks radio, gennemsnitlig underholdning, til når der ikke er andet at lave.",
					href: "http://www.dr.dk/"
				},
				{
					title: "TV2",
					image: "/images/hc2.jpg",
					desc: "Som Danmarks radio, men med brugerbetaling og reklamer.",
					href: "http://www.tv2.dk/"
				},
				{
					title: "123spill",
					image: "/images/hc3.jpg",
					desc: "Norsk spilhjemmeside, findes åbenbart stadig.",
					href: "http://www.123spill.no"
				}],
			labels: labels,
			navbarActiveSection: controller.activeNavbarLink(
				controller.navbarSections.LINKS)
		});
	});
});

module.exports = router;