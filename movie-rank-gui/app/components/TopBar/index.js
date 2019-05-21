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
  Row,
  Column,
} from 'styled-bootstrap-components';
import styled from 'styled-components';

const Input = ({ onChange, placeholder, invalid = false }) => (
  <InputGroup>
    <InputGroupPrepend>
      <InputGroupText>Api URL</InputGroupText>
    </InputGroupPrepend>
    <FormControl
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      valid={!invalid}
      invalid={invalid}
    />
  </InputGroup>
);
const ErrorLabel = styled(({ errorMessage }) => <span>{errorMessage}</span>)`
  color: red;
`;
const TopBar = ({ onChange, placeholder, errorMessage }) => (
  <Row>
    <Column>
      <Input
        onChange={onChange}
        placeholder={placeholder}
        invalid={!!errorMessage}
      />
    </Column>
    <Column>
      <ErrorLabel errorMessage={errorMessage} />
    </Column>
  </Row>
);

TopBar.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default memo(styled(TopBar)`
  background-color: lime;
  width: 100%;
`);
