import React, { Component } from 'react';
import {
	Container,
	Button,
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardSubtitle,
	Form,
	Input,
	InputGroup,
	InputGroupAddon
} from 'reactstrap';

import {
	getMovies,
	deleteMovie,
	searchMoviesByTitle,
	searchMoviesByStar
} from '../actions/movieActions';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import 'font-awesome/css/font-awesome.min.css';

class MovieList extends Component {
	state = {
		query: '',
		type: 'Title'
	};

	componentDidMount() {
		this.props.getMovies();
	}

	onDeleteClick = id => {
		this.props.deleteMovie(id);
	};

	onViewClick = (movie) => {
		alert(`Title: ${movie.title}\nYear: ${movie.year}\n` +
			`Format: ${movie.format}\nStars:\n${movie.stars.map((star) => ('- ' + star)).join('\n')}`);
	};

	search = (type, query) => {
		if (query !== '') {
			if (type === 'Title')
				this.props.searchMoviesByTitle(query);
			else
				this.props.searchMoviesByStar(query);
		} else {
			this.props.getMovies();
		}
	};

	handleSelectChange = (event) => {
		this.setState({
			type: event.target.value
		});

		this.search(event.target.value, this.state.query);
	};

	handleInputChange = (event) => {
		this.setState({
			query: event.target.value
		});

		this.search(this.state.type, event.target.value);
	};

	handleSubmit = (event) => {
		event.preventDefault();
	};

	render() {
		const movies = this.props.movie.movies;

		movies.sort((a, b) => (a.title.localeCompare(b.title)));

		return (
			<div>
				<Form className="mt-4 mb-4" onSubmit={ this.handleSubmit }>
					<InputGroup>
						<InputGroupAddon
							addonType="prepend">
							<Input
								type="select"
								name="select"
								onChange={ this.handleSelectChange }>
								<option>Title</option>
								<option>Star</option>
							</Input>
						</InputGroupAddon>
						<Input
							value={ this.state.query }
							placeholder={ (this.state.type === 'Title') ? 'The Girl with the Dragon Tattoo' : 'Daniel Craig'}
							name="search"
							onChange={ this.handleInputChange } />
					</InputGroup>
				</Form>

			<Container
				className="d-flex flex-row flex-wrap mt-3">
				{movies.map((movie) => (
					<Card
						className="col-md-3 mb-3"
						key={ movie._id }>
						<CardImg top width="100%" src="/poster.svg" alt="Card image cap"/>
						<CardBody>
							<CardTitle>
								{ movie.title }
							</CardTitle>
							<CardSubtitle
								className="text-secondary">
								{ movie.year }
							</CardSubtitle>
							<div
								style={{ zIndex: 2, position: 'absolute', right: '1.5rem', top: '0.5rem'}}>
								<Button
									color="light"
									size="sm"
									className="fa fa-eye"
									onClick={ this.onViewClick.bind(this, movie) }
									block/>
								<Button
									color="light"
									size="sm"
									className="fa fa-trash"
									onClick={ this.onDeleteClick.bind(this, movie._id) }
									block/>
							</div>
						</CardBody>
					</Card>
					))}
			</Container>
		</div>
		)
	}
}

MovieList.propTypes = {
	getMovies: PropTypes.func.isRequired,
	movie: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	movie: state.movie,
	query: state.query
});

export default connect(
	mapStateToProps,
	{ getMovies, searchMoviesByTitle, searchMoviesByStar, deleteMovie }
)(MovieList);
