const Joi = require('joi');
const mongoose = require('mongoose');

const formats = ['VHS', 'DVD', 'Blu-Ray'];

const Movie = new mongoose.model('Movie', new mongoose.Schema({
	title: {
		type: String,
		required: true,
		maxlength: 100
	},
	year: {
		type: Number,
		required: true,
		min: 1800,
		max: 3000
	},
	format:  {
		type: String,
		required: true,
		enum: formats
	},
	stars: {
		type: [{
			type: String,
			maxlength: 100
		}],
		required: true
	}
}));

const validate = (movie) => {
	const schema = {
		title: Joi.string().max(100).required(),
		year: Joi.number().min(1800).max(3000).required(),
		format: Joi.string().valid(formats).required(),
		stars: Joi.array().items(Joi.string().max(100)).min(1).required()
	};

	return (Joi.validate(movie, schema));
};

const parse = (file) => {
	return new Promise (((resolve) => {
		let moviesArray = [];
		let movies = file.replace(/(\r\n|\n|\r)/gm, '\n').split(/^\s*\n/gm);
		let pattern = /Title:\s*(.+?)\s*\nRelease Year:\s*(\d{4})\s*\nFormat:\s*(VHS|DVD|Blu-Ray)\s*\nStars:\s*(.*)/;

		movies.forEach((str) => {
			if (pattern.test(str)) {
				const result = pattern.exec(str);

				const movie = {
					title: result[1],
					year: parseInt(result[2], 10),
					format: result[3],
					stars: result[4].split(', ').map((name) => (name.trim()))
				};

				const { error } = validate(movie);

				if (error)
					throw new Error('Invalid file');

				moviesArray.push(movie);
			} else {
				throw new Error('Invalid file');
			}
		});
		resolve(moviesArray);
	}));
};

module.exports = {
	Movie,
	validate,
	parse
};
