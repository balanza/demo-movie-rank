import { takeLatest, put, debounce, select } from 'redux-saga/effects';
import omdb from 'omdb-client';
import {
  API_URL_CHANGED,
  REFRESH_RANKED_MOVIES,
  REQUEST_RANK_MOVIE,
  REQUEST_SEARCH_MOVIE,
} from './constants';
import { IMDB_API_KEY } from '../../utils/constants';
import {
  movieSearchResult,
  error,
  movieRanked,
  showRankedMovies,
  refreshRankedMovies,
  setApiErrorMessage,
} from './actions';
import { getRankedMovies, saveRank } from '../../utils/network';
import { makeSelectApiUrl } from './selectors';

export default function* homepageSaga() {
  yield takeLatest(REQUEST_SEARCH_MOVIE, searchMovie);
  yield takeLatest(REQUEST_RANK_MOVIE, rankMovie);
  yield takeLatest(REFRESH_RANKED_MOVIES, listRankedMovies);
  yield debounce(1000, API_URL_CHANGED, checkApiUrl);
}

function* searchMovie({ search }) {
  try {
    const { Error, Search } = yield omdbSearch(search);
    if (Error) yield put(movieSearchResult([]));
    else yield put(movieSearchResult(Search));
  } catch (ex) {
    if (ex !== 'Too many results') yield put(error(ex));
    yield put(movieSearchResult([]));
  }
}

function* rankMovie({ movie, rank }) {
  try {
    const apiUrl = yield select(makeSelectApiUrl());
    const movieWithRank = yield saveRank(apiUrl,{ ...movie, rank });
    yield put(movieRanked(movieWithRank));
    yield put(refreshRankedMovies());
  } catch (ex) {
    yield put(error(ex));
  }
}

function* listRankedMovies() {
  try {
    const apiUrl = yield select(makeSelectApiUrl());
    const movies = yield getRankedMovies(apiUrl);
    yield put(showRankedMovies(movies));
  } catch (ex) {
    yield put(error(ex));
  }
}

function* checkApiUrl({ url }) {
  try {
    const regex = /(https?:\/\/.+)(:[0-9]+)*\/?(.*)/;
    const errorMessage = regex.test(url) ? '' : 'Invalid format';
    yield put(setApiErrorMessage(errorMessage));
    if (!errorMessage) yield put(refreshRankedMovies());
  } catch (ex) {
    yield put(error(ex));
  }
}

const omdbSearch = query =>
  new Promise((ok, ko) => {
    omdb.search(
      {
        query,
        apiKey: IMDB_API_KEY,
      },
      (err, res) => {
        if (err) ko(err);
        else ok(res);
      },
    );
  });
