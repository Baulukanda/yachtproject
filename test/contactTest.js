const should = require('should');
const assert = require('assert');
const supertest = require('supertest');
const config = require('../config');
const mongoose = require('mongoose');
const contact = require('../routes/contact');
const rentController = require('../controllers/rents');
const app = require('../app');
const Rent = require('../models/rent');


describe('Contact', function() {
	before(function(done) {
		mongoose.connect(config.mongo.getURI(), config.mongo.options);
		done();
	});

	describe('Rents controller', function() {

		describe('saveRequest', function() {
			let createdRent;

			it('creates request', function(done) {
				rentController.saveRequest('Amy', '+45 12345678', 'amy@gmail.com', 'Denmark', 4, 'Rent plz', []).then((rent) => {
					createdRent = rent;
					rent.should.be.ok();
					rent.should.be.an.Object();
					rent.name.should.be.equal('Amy');
					rent.phone.should.be.equal('+45 12345678');
					rent.email.should.be.equal('amy@gmail.com');
					rent.country.should.be.equal('Denmark');
					rent.numberOfGuests.should.be.a.Number();
					rent.numberOfGuests.should.be.equal(4);
					rent.comment.should.be.equal('Rent plz');
					rent.rentPeriods.should.be.an.Array();
					rent.rentPeriods.length.should.be.equal(0);
					done();
				}).catch((err) => {
					done(err);
				});
			});

			after(function(done) {
				createdRent.delete().then(() => {
					done();
				}).catch((err) => {
					done(err);
				})
			});

		});

		describe('create rentPeriod', function() {
			let createdPeriod;

			it('creates rentPeriod', function(done) {
				const startDate = new Date(2018, 6, 1).valueOf();
				const endDate =  new Date(2018, 6, 14).valueOf();

				rentController.createRentPeriod(startDate, endDate).then((period) => {
					createdPeriod = period;
					period.startDate.should.be.a.Number();
					period.startDate.should.be.equal(startDate);
					period.endDate.should.be.a.Number();
					period.endDate.should.be.equal(endDate);
					done();
				});
			});

			after(function(done) {
				createdPeriod.delete().then(() => {
					done();
				}).catch((err) => {
					done(err);
				});
			});
		});

	});

	describe('Contact route', function() {
		let createdRent;

		describe('Post requests', function() {
			it('Submits valid contact form', function(done) {
				let data = {
					name: 'Amy',
					phone: '+45 87654321',
					email: 'amy@bing.com',
					country: 'Denmark',
					numberOfGuests: 3,
					comment: 'This is a comment!',
					rentPeriods: [],
					nomail: true
				};

				supertest(app)
					.post('/contact')
					.send(data)
					.set('Accept', 'application/json')
					.expect(200)
					.then(res => {
						delete data.nomail;

						Rent.findOne(data).then((rent) => {
							console.log(rent);
							createdRent = rent;
							rent.should.be.ok();
						}).catch((err) => {
							console.log(err);
						}).finally(done);
					});
			});

			it('Submits invalid form with missing data.', function(done) {
				let data = {
					name: 'Amy',
					numberOfGuests: 3,
					comment: 'This is a comment!',
					rentPeriods: [],
					nomail: true
				};

				supertest(app)
					.post('/contact')
					.send(data)
					.set('Accept', 'application/json')
					.expect(400, done);
			});

			it('Submits form with invalid data.', function(done) {
				let data = {
					name: 'Amy',
					phone: '+45 87654321',
					email: 'amy@bing.com',
					country: 'Denmark',
					numberOfGuests: 'invalid',
					comment: 'This is a comment!',
					rentPeriods: [],
					nomail: true
				};

				supertest(app)
					.post('/contact')
					.send(data)
					.set('Accept', 'application/json')
					.expect(500, done);
			});

			after(function(done) {
				createdRent.delete().then(() => {
					done();
				}).catch((err) => {
					done(err);
				});
			});
		});
	});
});