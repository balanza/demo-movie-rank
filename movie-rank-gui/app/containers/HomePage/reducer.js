/*
 *
 * Homepage reducer
 *
 */
import produce from 'immer';
import {
  API_URL_CHANGED,
  ERROR_INVALID_API_URL,
  MOVIE_RANKED,
  MOVIE_SEARCH_RESULT,
  REQUEST_SEARCH_MOVIE,
  SHOW_RANKED_MOVIES
} from './constants';

export const initialState = {
  rankedMovies: [],
  foundMovies: [],
  searchQuery: '',
};

/* eslint-disable default-case, no-param-reassign */
const homepageReducer = (state = initialState, action) =>
  produce(state, draft => {
    const { type, ...payload } = action;
    switch (type) {
      case MOVIE_SEARCH_RESULT:
        draft.foundMovies = payload.result;
        break;
      case MOVIE_RANKED:
        const index = draft.rankedMovies.findIndex(movie => movie.imdbID === payload.movie.imdbID);
        if (index>=0) draft.rankedMovies.splice(index, payload.movie);
        else draft.rankedMovies.push(payload.movie);
        break;
      case SHOW_RANKED_MOVIES:
        draft.rankedMovies = payload.movies;
        break;
      case ERROR_INVALID_API_URL:
        draft.apiErrorMessage = payload.message;
        break;
      case API_URL_CHANGED:
        draft.apiUrl = payload.url;
        break;
    }
  });

export default homepageReducer;
