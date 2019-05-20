import {
  REQUEST_SEARCH_MOVIE,
  MOVIE_SEARCH_RESULT,
  ERROR,
  REQUEST_RANK_MOVIE,
  MOVIE_RANKED,
  SHOW_RANKED_MOVIES,
  REFRESH_RANKED_MOVIES,
} from './constants';

export function requestSearchMovie(search) {
  return {
    type: REQUEST_SEARCH_MOVIE,
    search,
  };
}

export function movieSearchResult(result) {
  return {
    type: MOVIE_SEARCH_RESULT,
    result,
  };
}

export function rankMovie({ movie, rank }) {
  return {
    type: REQUEST_RANK_MOVIE,
    movie,
    rank,
  };
}

export function movieRanked({ movie }) {
  return {
    type: MOVIE_RANKED,
    movie,
  };
}

export function showRankedMovies(movies) {
  return {
    type: SHOW_RANKED_MOVIES,
    movies,
  };
}

export function refreshRankedMovies() {
  return {
    type: REFRESH_RANKED_MOVIES
  };
}

export function error(exception) {
  return {
    type: ERROR,
    exception,
  };
}
