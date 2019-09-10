import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from '@emotion/styled/macro';
import {compose, withHandlers, pure} from 'recompose';
import {getCurrentUser} from '../reducers/users';
import {deleteCommentFromNews} from '../reducers/news';
import deleteCommentIcon from './images/deleteCom.png';

const CommentConteiner = styled.div`
    word-wrap:break-word;
`;

const DeleteCommentButton = styled.button`
    position: relative;
    right: 0%;
    left: 95%;
    bottom: 7%;
    background:url(${deleteCommentIcon});
    cursor:pointer;
    border:none;
    width:50px;
    height:50px;
`;

const Comment = ({comment, user, handleDeleteCommentFromNews}) => (
  <CommentConteiner>
    <i>{comment.date.toDateString()}</i><br />
    {user.role === 'admin' && <DeleteCommentButton onClick={handleDeleteCommentFromNews} type="button" />}
    {comment.text}
    <hr />
  </CommentConteiner>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDeleteCommentFromNews: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: getCurrentUser(state)
});

export default compose(
  pure,
  connect(mapStateToProps, {deleteCommentFromNews}),
  withHandlers({
    handleDeleteCommentFromNews: props => () => {
      const {comment, deleteCommentFromNews, newsId} = props;

      deleteCommentFromNews(comment.id, newsId);
    }
  })
)(Comment);
