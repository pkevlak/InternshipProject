import React from 'react';
import {connect} from 'react-redux';
import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import Comment from './Comment';
import guid from '../utils';
import CommentForm from './CommentForm';
import {getCurrentUser} from '../reducers/users';

const CommentFormContainer = styled.div`
  position: relative;
  bottom: 30px;
`;

const Comments = ({singleNews, user}) => (
  <CommentFormContainer>
    {user.role === 'user' && (
    <CommentForm newsId={singleNews.id} />
    )}
    <br />
    {singleNews.comments.map(
      singleCom => <Comment key={guid()} comment={singleCom} newsId={singleNews.id} />
    )}
  </CommentFormContainer>
);

Comments.propTypes = {
  singleNews: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: getCurrentUser(state)
});

export default connect(mapStateToProps)(Comments);
