import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import {reduxForm} from 'redux-form';
import NewsFields from './NewsFields';
import {FormButton} from './CommentForm';

const Error = styled.div`
  color: red;
  font-size: 20px;
  position: ${props => (props.searchField && 'relative')};
  top: ${props => (props.searchField && '50px')};
  left: ${props => (props.searchField && '20%')};
  width: ${props => (props.searchField && '300px')};
`;

const NewsForm = ({
  handleSubmit,
  reset,
  error,
  initialValues
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <NewsFields /><br />
      {error && <Error>{error}</Error>}
      <FormButton type="submit">Save</FormButton>
      {initialValues === undefined && <FormButton type="button" onClick={reset}>Clear</FormButton> }
    </form>
  </div>
);

NewsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  error: PropTypes.string,
  initialValues: PropTypes.object
};

NewsForm.defaultProps = {
  error: undefined,
  initialValues: undefined
};

export default reduxForm({form: 'newsForm'})(NewsForm);

export {Error};
