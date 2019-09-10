import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import {Error} from './NewsForm';

const StyledInput = styled.input`
  height:35px;
  border-style: solid;
  border-color: black;
  border-width: 2px;
  border-radius: 3px;
  font-size: 20px;
  position: relative;
  left: ${props => (props.searchField && '350px')};
  bottom: ${props => (props.searchField && '38px')};
  width: ${props => (props.searchField ? '500px' : '400px')};
`;


const InputField = ({
  input, meta, type, placeholder, searchField
}) => (
  <div>
    <StyledInput searchField={searchField} placeholder={placeholder === undefined ? '' : placeholder} {...input} type={type} />
    <br />
    {(meta.error && meta.touched) && <Error searchField={searchField}>{meta.error}</Error>}
  </div>
);

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  searchField: PropTypes.bool
};

InputField.defaultProps = {
  placeholder: '',
  searchField: false
};

export default InputField;
