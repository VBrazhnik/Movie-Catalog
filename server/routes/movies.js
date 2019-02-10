const express = require('express');
const { Movie, validate, parse } = require('../model/movie');

const router = express.Router();

router.get('/', async (request, response) => {
	try {
		let movies;

		if (request.query.title)
			movies = await Movie.find({
				'title': {
					'$regex': request.query.title,
					'$options': 'i'
				}
			});
		else if (request.query.star)
			movies = await Movie.find({
				'stars': {
					'$regex': request.query.star,
					'$options': 'i'
				}
			});
		else
			movies = await Movie.find().collation({
				locale: 'en',
				strength: 3,
				caseFirst: 'lower'
			}).sort('title');

		response.json(movies);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.post('/', async (request, response) => {
	try {
		const { error } = validate(request.body);

		if (error)
			return (response.status(400).send(error.details[0].message));

		let movie = new Movie({
			title: request.body.title,
			year: request.body.year,
			format: request.body.format,
			stars: request.body.stars
		});

		response.json(await movie.save());
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.delete('/:id', async (request, response) => {
	try {
		const movie = await Movie.findOneAndDelete({ _id: request.params.id });

		if (!movie)
			return (response.status(404).send('The movie with the given ID was not found'));

		response.json(movie);
	} catch (error) {
		response.status(500).send(error.message);
	}
});

router.post('/upload', async (request, response) => {
	if (!request.files.movies)
		return (response.status(400).send('No file uploaded'));

	try {
		let movies = await parse(request.files.movies.data.toString().trim());

		response.json(await Movie.insertMany(movies));
	} catch(error) {
		response.status(400).send(error.message);
	}
});

module.exports = router;
