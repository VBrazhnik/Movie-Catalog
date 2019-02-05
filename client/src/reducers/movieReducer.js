import {
	GET_MOVIES,
	ADD_MOVIE,
	UPLOAD_MOVIES,
	DELETE_MOVIE,
	SEARCH_MOVIES_BY_TITLE,
	SEARCH_MOVIES_BY_STAR,
	MOVIES_LOADING
} from '../actions/types';

const initialState = {
	movies: [],
	loading: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_MOVIES:
			return {
				...state,
				movies: action.payload,
				loading: false
			};
		case UPLOAD_MOVIES:
			return {
				...state,
				movies: [...action.payload, ...state.movies],
				loading: false
			};
		case DELETE_MOVIE:
			return {
				...state,
				movies: state.movies.filter((movie) => (movie._id !== action.payload))
			};
		case ADD_MOVIE:
			return {
				...state,
				movies: [action.payload, ...state.movies]
			};
		case SEARCH_MOVIES_BY_TITLE:
			return {
				...state,
				movies: action.payload
			};
		case SEARCH_MOVIES_BY_STAR:
			return {
				...state,
				movies: action.payload
			};
		case MOVIES_LOADING:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}
