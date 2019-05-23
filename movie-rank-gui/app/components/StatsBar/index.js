/**
 *
 * SearchBar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Column,
} from 'styled-bootstrap-components';
import styled from 'styled-components';

const WithStats = ({ count, avg }) => (
  <div>
      You have ranked { count } movie{ count > 1 && 's'} with an average of { avg }
  </div>
);

const NoStats = () => (
  <div>
    You have ranked no movies yet
  </div>
);

const StatsBar = ({ stats }) => stats && stats.count > 0
  ? WithStats(stats)
  : NoStats();



StatsBar.propTypes = {
  stats: PropTypes.object,
};

export default memo(styled(StatsBar)`
  background-color: lime;
  width: 100%;
`);
