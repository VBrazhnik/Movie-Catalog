let { Movie } = require('../model/movie');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Movies', () => {

	beforeEach((done) => {
		Movie.deleteMany({}, (error) => {
			done();
		});
	});

	describe('/GET /api/movies/', () => {
		it('It should GET all the movies', (done) => {
			chai.request(server)
				.get('/api/movies/')
				.end((error, response) => {
					response.should.have.status(200);
					response.body.should.be.a('array');
					response.body.length.should.be.eql(0);
					done();
				});
		});
	});

	describe('/POST /api/movies/', () => {
		it('It should POST a movie ', (done) => {
			let movie = {
				title: 'The Girl with Dragon Tattoo',
				year: 2011,
				format: 'Blu-Ray',
				stars: [
					"Daniel Craig",
					"Rooney Mara",
					"Christopher Plummer"
				]
			};

			chai.request(server)
				.post('/api/movies/')
				.send(movie)
				.end((error, response) => {
					response.should.have.status(200);
					response.body.should.be.a('object');
					response.body.should.have.property('_id');
					response.body.should.have.property('title');
					response.body.should.have.property('year');
					response.body.should.have.property('format');
					response.body.should.have.property('stars');
					done();
				});
		});
	});

	afterEach((done) => {
		Movie.deleteMany({}, (error) => {
			done();
		});
	});
});
