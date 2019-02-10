const config = require('config');

const log = require('debug')('app:log');

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const movies = require('./routes/movies');

const mongoose = require('mongoose');

const app = express();

mongoose.connect(config.get('database.uri'), { useNewUrlParser: true })
	.then(() => log(`Successfully connected to MongoDB database on "${config.get('database.uri')}"`))
	.catch((error) => log(`Cannot connect to MongoDB: ${error}`));

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(morgan('tiny', { stream: { write: msg => log(msg) } }));

app.use('/api/movies/', movies);

app.listen(config.get('server.port'), config.get('server.host'),
	() => log(`Server is running on ${config.get('server.host')}:${config.get('server.port')}`));

module.exports = app;
