const markdownIt = require('markdown-it');
const markdown = new markdownIt();
const Label = require('./../models/label');
const languages = {
	ENGLISH: 'english',
	DANISH: 'danish',
	SWEDISH: 'swedish',
	NORWEGIAN: 'norwegian',
	RUSSIAN: 'russian'
};

let language = languages.ENGLISH;

const navbarSections = {
	HOME: 'home',
	INFO: 'info',
	LINKS: 'links',
	PHOTOS: 'photos',
	CONTACT: 'contact'
}

exports.languages = languages;
exports.navbarSections = navbarSections;

/**
 * Initiates language from session.hbs object
 * @param language enum
 */
exports.setLanguage = (lang) => {
	if(lang) {
		language = lang;
	}
};

exports.getLabel = (id) => {
	if(language === null) throw 'Language not set.';

	const label = Label.findOne({ _id: id }).exec();

	return new Promise((resolve, reject) => {
		label.then((label) => {
			if(label !== null) {
				const val = label.values.get(language);

				if (val) {
					resolve(val);
				} else {
					resolve(id);
				}
			} else {
				reject('Label ' + id + ' equals null');
			}
		});

		label.catch(() => {
			reject('Label not found');
		});
	});
};

exports.loadLabels = () => {
	const labels = Label.find({}).exec();

	return new Promise((resolve, reject) => {
		labels.then((labels) => {
			labels.getLabel = (id) => {
				let label = {
					text: null,
					markdown: null
				};

				for(let i = 0; i < labels.length; i++) {
					if(labels[i]._id === id) {
						label.text = labels[i].values.get(language);
						label.markdown = markdown.render(labels[i].values.get(language));
					}
				}

				return label;
			}

			resolve(labels);
		}).catch((err) => {
			reject(err);
		});
	});
};

exports.getMarkdown = (text) => {
	return markdown.render(text);
};

exports.activeNavbarLink = (section) => {
	return {
		home: (section === navbarSections.HOME) ? 'active' : '',
		info: (section === navbarSections.INFO) ? 'active' : '',
		links: (section === navbarSections.LINKS) ? 'active' : '',
		photos: (section === navbarSections.PHOTOS) ? 'active' : '',
		contact: (section === navbarSections.CONTACT) ? 'active' : '',
	}
}