import { takeLatest, put } from 'redux-saga/effects';
import omdb from 'omdb-client';
import {
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
} from './actions';
import { getRankedMovies, saveRank } from '../../utils/network';

export default function* homepageSaga() {
  yield takeLatest(REQUEST_SEARCH_MOVIE, searchMovie);
  yield takeLatest(REQUEST_RANK_MOVIE, rankMovie);
  yield takeLatest(REFRESH_RANKED_MOVIES, listRankedMovies);
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
    const movieWithRank = yield saveRank({ ...movie, rank });
    yield put(movieRanked(movieWithRank));
    yield put(refreshRankedMovies());
  } catch (ex) {
    yield put(error(ex));
  }
}

function* listRankedMovies() {
  try {
    const movies = yield getRankedMovies();
    yield put(showRankedMovies(movies));
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
