import React, { memo } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import PropTypes from 'prop-types';
import { Column, Row } from 'styled-bootstrap-components';
// import styled from 'styled-components';

function MovieItem({ movie, onRateChange }) {
  if (!movie) return <div></div>;
  return (
    <Row>
      <Column>
        <h3>{movie.Title}</h3>
        <h4>{movie.Year}</h4>

        <StarRatingComponent
          name={`rate-${movie.imdbID}`}
          starCount={5}
          value={movie.rank}
          onStarClick={rank => onRateChange({ movie, rank })}
        />
      </Column>
      <Column>
        <img src={movie.Poster} alt={movie.Title} />
      </Column>
    </Row>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.object,
  onRateChange: PropTypes.func,
};

export default memo(MovieItem);
