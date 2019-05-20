/**
 *
 * SearchBar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputGroup,
  InputGroupPrepend,
  InputGroupText,
} from 'styled-bootstrap-components';
// import styled from 'styled-components';

const SearchBar = ({ onChange, placeholder }) => (
  <InputGroup>
    <InputGroupPrepend>
      <InputGroupText>
        <span role="img">🔎</span>
      </InputGroupText>
    </InputGroupPrepend>
    <FormControl type="text" placeholder={placeholder} onChange={onChange} />
  </InputGroup>
);

SearchBar.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default memo(SearchBar);
