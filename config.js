const config = {
	mongo: {
		host: 'ds227858.mlab.com:27858/dat-s3-project',
		user: 'dat',
		password: 'PjPbknkgMtUDBpw9JzcwGmCy7AaF2Vot',
		options: {
			useNewUrlParser: true,
			useCreateIndex: true,
			autoIndex: true
		},
		getURI: () => {
			return 'mongodb://' + config.mongo.user + ':' + config.mongo.password + '@' + config.mongo.host;
		}
	},
	session: {
		secret: '01110011 01110101 01110000 01100101 01110010 00100000 01110011 01100101 01100011 01110010 01100101 01110100'
	},
	contact: {
		ownerEmail: 'stuff@ahlforn.net',
		smtpUsername: 'tempnatalyayacht@gmail.com',
		smtpPassword: 'T3mppass'
	}
};

module.exports = config;