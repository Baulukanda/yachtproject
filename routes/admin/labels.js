const controller = require('../../controllers/controller');
const labelController = require('../../controllers/admin/labels');
const express = require('express');
const router = express.Router();

const languages = [
	controller.languages.ENGLISH,
	controller.languages.DANISH,
	controller.languages.SWEDISH,
	controller.languages.NORWEGIAN,
	controller.languages.RUSSIAN
];

router.get('/', (req, res, next) => {
	labelController.getLabels().then((labels) => {
		console.log(labels);
		res.render('admin/labels', { labels: labels });
	}).catch((err) => console.log);
});

router.get('/:id', (req, res, next) => {
	labelController.getLabel(req.params.id).then((label) => {
		res.render('admin/labels', { label: label, languages: languages });
	})
});

router.post('/:id', (req, res, next) => {
	console.log('body: ', req.body);
	const newValues = {
		_id: req.body._id,
		values: new Map()
	}

	for(let i = 0; i < languages.length; i++) {
		newValues.values.set(languages[i], req.body[languages[i]]);
	}

	console.log('new values: ', newValues);

	labelController.updateLabel(newValues).then(() => {
		res.redirect('/admin/labels');
	}).catch((err) => {
		console.log(err);
	});
});

function getValue(json, key) {
	for(let k in json) {
		if(json.hasOwnProperty(key)) {
			return p[key];
		} else {
			return '';
		}
	}
}

router.get('/generate', (req, res, next) => {
	/*
	controller.createLabel('navbar_info', new Map([
		[controller.languages.ENGLISH, 'Info'],
		[controller.languages.DANISH, 'Info'],
		[controller.languages.SWEDISH, 'Info'],
		[controller.languages.NORWEGIAN, 'Info'],
		[controller.languages.RUSSIAN, 'Информация']
	]));

	controller.createLabel('navbar_links', new Map([
		[controller.languages.ENGLISH, 'Links'],
		[controller.languages.DANISH, 'Links'],
		[controller.languages.SWEDISH, 'Länkar'],
		[controller.languages.NORWEGIAN, 'Lenker'],
		[controller.languages.RUSSIAN, 'связи']
	]));

	controller.createLabel('navbar_pictures', new Map([
		[controller.languages.ENGLISH, 'Pictures'],
		[controller.languages.DANISH, 'Billeder'],
		[controller.languages.SWEDISH, 'Bilder'],
		[controller.languages.NORWEGIAN, 'Bilder'],
		[controller.languages.RUSSIAN, 'фотографий']
	]));

	controller.createLabel('navbar_contact', new Map([
		[controller.languages.ENGLISH, 'Contact'],
		[controller.languages.DANISH, 'kontakt'],
		[controller.languages.SWEDISH, 'Kontakta'],
		[controller.languages.NORWEGIAN, 'Kontakt'],
		[controller.languages.RUSSIAN, 'контакт']
	]));

	controller.createLabel('navbar_language', new Map([
		[controller.languages.ENGLISH, 'Language'],
		[controller.languages.DANISH, 'Sprog'],
		[controller.languages.SWEDISH, 'Språk'],
		[controller.languages.NORWEGIAN, 'Språk'],
		[controller.languages.RUSSIAN, 'язык']
	]));

	controller.createLabel('navbar_lang_english', new Map([
		[controller.languages.ENGLISH, 'English'],
		[controller.languages.DANISH, 'Engelsk'],
		[controller.languages.SWEDISH, 'Engelsk'],
		[controller.languages.NORWEGIAN, 'Engelsk'],
		[controller.languages.RUSSIAN, 'английский']
	]));

	controller.createLabel('navbar_lang_danish', new Map([
		[controller.languages.ENGLISH, 'Danish'],
		[controller.languages.DANISH, 'Dansk'],
		[controller.languages.SWEDISH, 'Danska'],
		[controller.languages.NORWEGIAN, 'Dansk'],
		[controller.languages.RUSSIAN, 'датский']
	]));

	controller.createLabel('navbar_lang_swedish', new Map([
		[controller.languages.ENGLISH, 'Swedish'],
		[controller.languages.DANISH, 'Svensk'],
		[controller.languages.SWEDISH, 'Svenska'],
		[controller.languages.NORWEGIAN, 'Svensk'],
		[controller.languages.RUSSIAN, 'шведский']
	]));

	controller.createLabel('navbar_lang_norwegian', new Map([
		[controller.languages.ENGLISH, 'Norwegian'],
		[controller.languages.DANISH, 'Norsk'],
		[controller.languages.SWEDISH, 'Norrman'],
		[controller.languages.NORWEGIAN, 'Norsk'],
		[controller.languages.RUSSIAN, 'норвежский']
	]));

	controller.createLabel('navbar_lang_russian', new Map([
		[controller.languages.ENGLISH, 'Russian'],
		[controller.languages.DANISH, 'Russisk'],
		[controller.languages.SWEDISH, 'Ryska'],
		[controller.languages.NORWEGIAN, 'Russisk'],
		[controller.languages.RUSSIAN, 'русский']
	]));
	*/
})

module.exports = router;