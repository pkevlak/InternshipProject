import React from 'react';
import {
  Field, reduxForm, SubmissionError
} from 'redux-form';
import {connect} from 'react-redux';
import styled from '@emotion/styled/macro';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import guid from '../utils';
import {addCommentToNews} from '../reducers/news';
import TextArea from './TextArea';

const FormButton = styled.button`
  width: 203px;
  height:35px;
  border-style: solid;
  border-color: black;
  border-radius: 3px;
  cursor:pointer;
  background-color: transparent;
  font-size: 20px;
  outline: none;
`;


const CommentForm = ({handleSubmit}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <Field
        styled
        name="comment"
        type="text"
        component={TextArea}
      />
      <FormButton type="submit">Add</FormButton>
    </form>
  </div>
);

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default compose(
  connect(null, {addCommentToNews}),
  reduxForm({
    form: 'commentForm',
    onSubmit: (values, dispatch, props) => {
      if (values.comment) {
        const {addCommentToNews, newsId} = props;
        const comment = {
          id: guid(),
          text: values.comment,
          date: new Date()
        };
        addCommentToNews(comment, newsId);
        props.reset();
      } else {
        throw new SubmissionError(
          {
            comment: 'Comment is empty'
          }
        );
      }
    }
  })
)(CommentForm);

export {FormButton};
