import React from 'react';
import {
  Field, reduxForm, SubmissionError
} from 'redux-form';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import styled from '@emotion/styled/macro';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {addSearch} from '../reducers/search';
import InputField from './InputField';
import findButtonIcon from './images/search.png';

const FindButton = styled.button`
  position: relative;
  left:860px;
  bottom:83px;
  width:500px;
  height:30px;
  background:url(${findButtonIcon});
  cursor:pointer;
  border:none;
  width:50px;
  height:50px;
  outline: none;
`;

const SearchForm = ({handleSubmit}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <Field
        name="find"
        type="text"
        searchField
        component={InputField}
      />
      <FindButton type="submit" />
    </form>
  </div>
);

SearchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default withRouter(compose(
  connect(null, {addSearch}),
  reduxForm({
    form: 'searchForm',
    onSubmit: (values, dispatch, props) => {
      if (values.find) {
        const {addSearch, history} = props;
        addSearch(values.find);
        history.push('/');
      } else {
        throw new SubmissionError(
          {
            find: 'Search is empty'
          }
        );
      }
    }
  })
)(SearchForm));
