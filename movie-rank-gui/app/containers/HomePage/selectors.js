import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homepage state domain
 */

const selectHomepageDomain = state => state.homepage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Homepage
 */

const makeSelectHomepage = () =>
  createSelector(
    selectHomepageDomain,
    substate => substate,
  );

const makeSelectFoundMovies = () =>
  createSelector(
    selectHomepageDomain,
    substate => substate.foundMovies,
  );

const makeSelectRankedMovies = () =>
  createSelector(
    selectHomepageDomain,
    substate => substate.rankedMovies,
  );

export default makeSelectHomepage;
export { selectHomepageDomain, makeSelectFoundMovies, makeSelectRankedMovies };
