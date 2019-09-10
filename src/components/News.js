import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled/macro';
import {
  compose, withHandlers, pure, mapProps
} from 'recompose';
import Comments from './Comments';
import {getNews, deleteTheNews} from '../reducers/news';
import {getCurrentUser} from '../reducers/users';
import deleteTheNewsIcon from './images/delete.png';
import editTheNewsIcon from './images/edit.png';

const TheNewsContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 5%;
  right: 5%;
`;

const TheNewsHeader = styled.div`
  font-weight: bold;
  font-size: 32px;
`;

const DeleteTheNewsButton = styled.button`
  position: relative;
  background:url(${deleteTheNewsIcon});
  cursor:pointer;
  border:none;
  width:50px;
  height:50px;
  bottom: 13px;
  outline: none;
`;

const EditTheNewsButton = styled.button`
  position: relative;
  background:url(${editTheNewsIcon});
  cursor:pointer;
  border:none;
  width:50px;
  height:50px;
  bottom: 13px;
  margin-right: 50px;
  outline: none;
`;

const TheNewsImage = styled.img`
  width: 100%;
`;

const News = ({
  user, handleDeleteButton, theNews
}) => (
  <div>
    <TheNewsContainer>
      <TheNewsHeader>
        {user.role === 'admin' && <Link to="/"><DeleteTheNewsButton type="button" onClick={handleDeleteButton} /></Link>}
        {user.role === 'admin' && (
          <Link to={{
            pathname: '/editNews',
            aboutProps:
            {
              curNews: theNews
            }
          }}
          ><EditTheNewsButton type="button" />
          </Link>
        )}
        {theNews.title}
      </TheNewsHeader><br />
      <p>{theNews.description}</p>
      <TheNewsImage src={theNews.urlToImage} alt="theNewsImage" /><br />
      {theNews.content}<br />
      <h1>Comments</h1>
      <br />
      {user.role === 'notReg' ? <p>You cant see or add comments. Please Sign In or Sign </p> : <Comments singleNews={theNews} />}
      <br />
    </TheNewsContainer>
  </div>
);

News.propTypes = {
  user: PropTypes.object.isRequired,
  theNews: PropTypes.object.isRequired,
  handleDeleteButton: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  news: getNews(state),
  user: getCurrentUser(state)
});

export default compose(
  pure,
  connect(mapStateToProps, {deleteTheNews}),
  mapProps(({match, news, ...other}) => {
    const {params} = match;
    const theNews = news.find(theNews => theNews.id === params.id);
    return {
      ...other,
      match,
      news,
      theNews,
      params
    };
  }),
  withHandlers({
    handleDeleteButton: props => () => {
      const {news, deleteTheNews, params} = props;
      const theNews = news.find(theNews => theNews.id === params.id);
      deleteTheNews(theNews.id);
    }
  })
)(News);

export {DeleteTheNewsButton};
