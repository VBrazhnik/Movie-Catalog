const express = require('express');
const { Movie, validate, parse } = require('../model/movie');
const router = express.Router();

router.get('/', async (request, response) => {
	let movies;

	if (request.query.title)
		movies = await Movie.find({ 'title' : { '$regex': request.query.title, '$options': 'i' } });
	else if (request.query.star)
		movies = await Movie.find({ 'stars': { '$regex': request.query.star, '$options': 'i' } });
	else
		movies = await Movie.find().collation({ locale:'en', strength: 3, caseFirst: 'lower' }).sort('title');

	response.json(movies);
});

router.post('/', async (request, response) => {
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
});

router.delete('/:id', async (request, response) => {
	const movie = await Movie.findByIdAndRemove(request.params.id);

	if (!movie)
		return (response.status(404).send('The movie with the given ID was not found'));

	response.json(movie);
});

router.post('/upload', async (request, response) => {
	if (!request.files.movies)
		return (response.status(400).send('No file uploaded'));

	try {
		let movies = await parse(request.files.movies.data.toString().trim());
		return (response.json(await Movie.insertMany(movies)));
	} catch(error) {
		return (response.status(400).send(error.message));
	}
});

module.exports = router;
