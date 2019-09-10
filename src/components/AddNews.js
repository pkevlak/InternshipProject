import React from 'react';
import PropTypes from 'prop-types';
import {SubmissionError, reset} from 'redux-form';
import styled from '@emotion/styled/macro';
import {
  compose, withHandlers, pure
} from 'recompose';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentUser} from '../reducers/users';
import {addTheNews} from '../reducers/news';
import NewsForm from './NewsForm';
import guid from '../utils';

const CenteredDiv = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  top: 15%;
`;

const AddNews = ({user, submit}) => (
  <div>
    <CenteredDiv>
      {user.role !== 'admin' && <Redirect to="/notFound" />}
      <div>
        <h1>AddNews</h1>
        <NewsForm onSubmit={submit} />
      </div>
    </CenteredDiv>
  </div>
);

AddNews.propTypes = {
  user: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: getCurrentUser(state)
});

export default compose(
  pure,
  connect(mapStateToProps, {addTheNews}),
  withHandlers({
    submit: props => (values, dispatch) => {
      if (values.title !== undefined) {
        const {addTheNews} = props;
        const date = new Date(values.publishedAt);
        const freshNews = {
          source: {
            id: null,
            name: 'admin'
          },
          author: values.author,
          title: values.title,
          description: values.description,
          url: '',
          urlToImage: values.urlToImage,
          publishedAt: date.toISOString(),
          content: values.content,
          id: guid(),
          comments: []
        };
        addTheNews(freshNews);
        dispatch(reset('newsForm'));
      } else {
        throw new SubmissionError(
          {
            _error: 'Form is blank'
          }
        );
      }
    }
  })
)(AddNews);

export {
  CenteredDiv
};
