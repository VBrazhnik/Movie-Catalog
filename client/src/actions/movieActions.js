import axios from 'axios';

import {
	GET_MOVIES,
	ADD_MOVIE,
	UPLOAD_MOVIES,
	DELETE_MOVIE,
	SEARCH_MOVIES_BY_TITLE,
	SEARCH_MOVIES_BY_STAR,
	MOVIES_LOADING
} from './types';

export const getMovies = () => (dispatch) => {
	dispatch(setItemsLoading());

	return axios.get('/api/movies/')
		.then(res =>
			dispatch({
				type: GET_MOVIES,
				payload: res.data
			})
	);
};

export const addMovie = (movie) => (dispatch) => {
	return axios.post('/api/movies/', movie)
		.then(res =>
			dispatch({
				type: ADD_MOVIE,
				payload: res.data
			})
	);
};

export const deleteMovie = (id) => (dispatch) => {
	axios.delete(`/api/movies/${id}`)
		.then(res =>
			dispatch({
				type: DELETE_MOVIE,
				payload: id
			})
	);
};

export const uploadMovies = (file) => (dispatch) => {
	dispatch(setItemsLoading());

	const data = new FormData();
	data.append('movies', file.entity, file.name);

	return axios.post('/api/movies/upload', data)
		.then(res =>
			dispatch({
				type: UPLOAD_MOVIES,
				payload: res.data
			}));
};

export const searchMoviesByTitle = (title) => (dispatch) => {
	dispatch(setItemsLoading());

	axios.get(`/api/movies/?title=${title}`)
		.then(res =>
			dispatch({
				type: SEARCH_MOVIES_BY_TITLE,
				payload: res.data
			}));
};

export const searchMoviesByStar = (star) => (dispatch) => {
	dispatch(setItemsLoading());

	axios.get(`/api/movies/?star=${star}`)
		.then(res =>
			dispatch({
				type: SEARCH_MOVIES_BY_STAR,
				payload: res.data
			}));
};

export const setItemsLoading = () => {
	return {
		type: MOVIES_LOADING
	};
};
