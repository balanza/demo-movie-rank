/**
 *
 * Homepage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Row, Column, Container } from 'styled-bootstrap-components';
import styled from 'styled-components';
import makeSelectHomepage, {
  makeSelectApiErrorMessage,
  makeSelectFoundMovies,
  makeSelectRankedMovies,
  makeSelectStats,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { rankMovie, requestSearchMovie, setApiUrl } from './actions';
import MovieItem from '../../components/MovieItem';
import SearchBar from '../../components/SearchBar';
import TopBar from '../../components/TopBar';
import StatsBar from '../../components/StatsBar';

export function Homepage({
  searchMovie,
  foundMovies,
  rankMovie,
  rankedMovies,
  setApiUrl,
  apiErrorMessage,
  stats,
}) {
  useInjectReducer({ key: 'homepage', reducer });
  useInjectSaga({ key: 'homepage', saga });

  const GreyItem = styled(MovieItem)`
    background-color: #eee;
  `;

  return (
    <Container fluid>
      <Helmet>
        <title>Homepage</title>
        <meta name="description" content="Description of Homepage" />
      </Helmet>
      <TopBar
        onChange={e => setApiUrl(e.target.value)}
        placeholder="Your API base url"
        errorMessage={apiErrorMessage}
      />
      <h1>Movie Rank</h1>
      <h2>Rank the movies you love and hate</h2>
      <StatsBar stats={stats} />
      <Row>
        <Column>
          <h3>My List</h3>
          {[...rankedMovies].reverse().map(movie => (
            <MovieItem movie={movie} onRateChange={rankMovie} />
          ))}
        </Column>
        <Column>
          <SearchBar
            onChange={e => searchMovie(e.target.value)}
            placeholder="start typing..."
          />
          {foundMovies.map(movie => (
            <GreyItem movie={movie} onRateChange={rankMovie} />
          ))}
        </Column>
      </Row>
    </Container>
  );
}

Homepage.propTypes = {
  searchMovie: PropTypes.func.isRequired,
  rankMovie: PropTypes.func.isRequired,
  setApiUrl: PropTypes.func.isRequired,
  foundMovies: PropTypes.array,
  rankedMovies: PropTypes.array,
  stats: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomepage(),
  foundMovies: makeSelectFoundMovies(),
  rankedMovies: makeSelectRankedMovies(),
  apiErrorMessage: makeSelectApiErrorMessage(),
  stats: makeSelectStats(),
});

function mapDispatchToProps(dispatch) {
  return {
    searchMovie: searchQuery => dispatch(requestSearchMovie(searchQuery)),
    rankMovie: e => dispatch(rankMovie(e)),
    setApiUrl: e => dispatch(setApiUrl(e)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Homepage);
