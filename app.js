const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');
const bodyParser = require('body-parser')
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const mailer = require('express-mailer');

const indexRouter = require('./routes/index');
const infoRouter = require('./routes/info');
const linksRouter = require('./routes/links');
const photosRouter = require('./routes/photos');
const contactRouter = require('./routes/contact');
const languageRouter = require('./routes/language');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/admin/logout');
const adminDashboardRouter = require('./routes/admin/index');
const adminLabelsRouter = require('./routes/admin/labels');
const adminRentsRouter = require('./routes/admin/rents');


const app = express();

// Mongoose setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.getURI(), config.mongo.options);

const store = new mongoDBStore({
	uri: config.mongo.getURI(),
	collection: 'session'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mailer.extend(app, {
	from: 'no-reply@tempnatalyayacht.dk',
	host: 'smtp.gmail.com', // hostname
	secureConnection: true, // use SSL
	port: 465, // port for secure SMTP
	transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
	auth: {
		user: config.contact.smtpUsername,
		pass: config.contact.smtpPassword
	}
});

app.use(session({
	secret: config.session.secret,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
	},
	store: store,
	resave: true,
	saveUninitialized: true
}));

// Middleware to store previous visited URL
const storePage = (req, res, next) => {
	req.session.previousURL = req.session.currentURL;
	req.session.currentURL = req.originalUrl;
	next();
};

// Middleware to check for login
const auth = (req, res, next) => {
	console.log(req.session);
	if(req.session.login) {
		next();
	} else {
		req.session.requestedAdminPage = req.url;
		res.redirect('/login');
	}
}

app.use(storePage);
app.use('/', indexRouter);
app.use('/info', infoRouter);
app.use('/links', linksRouter);
app.use('/photos', photosRouter);
app.use('/contact', contactRouter);
app.use('/language', languageRouter);

// Admin section; needs authentication!
app.use('/login', loginRouter);
app.all('/admin*', auth);
app.use('/admin/', adminDashboardRouter);
app.use('/admin/labels', adminLabelsRouter);
app.use('/admin/rents', adminRentsRouter);
app.use('/admin/logout', logoutRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;