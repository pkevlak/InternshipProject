import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import {Error} from './NewsForm';

const StyledTextArea = styled.textarea`
  width: ${props => (props.styled ? '100%' : '400px')};
  min-height: ${props => (props.styled ? '' : '300px')};
  resize: none;
  height:${props => (props.styled ? '' : '35px')};
  border-style: solid;
  border-color: black;
  border-width: 2px;
  border-radius: 3px;
  font-size: 20px;
`;

const TextArea = ({
  input, meta, placeholder, styled
}) => (
  <div>
    <StyledTextArea styled={styled} placeholder={placeholder} {...input} />
    <br />
    {(meta.error && meta.touched) && <Error>{meta.error}</Error>}
  </div>
);

TextArea.propTypes = {
  input: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  meta: PropTypes.object.isRequired,
  styled: PropTypes.bool,
};

TextArea.defaultProps = {
  placeholder: '',
  styled: false
};

export default TextArea;
