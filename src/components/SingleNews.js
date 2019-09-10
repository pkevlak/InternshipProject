import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled/macro';
import {
  compose, withHandlers, pure, mapProps
} from 'recompose';
import {deleteTheNews} from '../reducers/news';
import {getCurrentUser} from '../reducers/users';
import deleteTheNewsIcon from './images/delete.png';

const DeleteSingleNewsButton = styled.button`
  position: relative;
  left: 92%;
  background:url(${deleteTheNewsIcon});
  cursor:pointer;
  border:none;
  width:50px;
  height:50px;
  outline: none;
`;

const TitleImage = styled.img`
  width: ${props => (props.random ? '300px' : '780px')};
`;

const SingleNews = ({
  singleNews, handleDeleteButton, user, date, imageSize
}) => (
  <div>
    <Link to={`/news/${singleNews.id}`}><h1>{singleNews.title}</h1></Link>
    <TitleImage random={imageSize} alt="newsImg" src={singleNews.urlToImage} />
    {singleNews.description}<br />
    {user.role === 'admin' && <DeleteSingleNewsButton onClick={handleDeleteButton} type="button" />}<br />
    {singleNews.author !== null ? singleNews.author : singleNews.source.name}<br />
    {date}
    <hr />
    <br />
  </div>
);

SingleNews.propTypes = {
  singleNews: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleDeleteButton: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  imageSize: PropTypes.string,
};

SingleNews.defaultProps = {
  imageSize: undefined
};

const mapStateToProps = state => ({
  user: getCurrentUser(state)
});

export default compose(
  pure,
  connect(mapStateToProps, {deleteTheNews}),
  mapProps(({singleNews, ...other}) => {
    let ymdArr = [];
    let timeArr = [];
    if (singleNews.publishedAt !== undefined) {
      ymdArr = singleNews.publishedAt.slice(0, -1).split('T')[0].split('-');
      timeArr = singleNews.publishedAt.slice(0, -1).split('T')[1].split(':');
    }
    const date = `${timeArr[0]}:${timeArr[1]} ${ymdArr[2]}/${ymdArr[1]}/${ymdArr[0]}`;
    return {
      ...other,
      singleNews,
      date
    };
  }),
  withHandlers({
    handleDeleteButton: props => () => {
      const {deleteTheNews, singleNews} = props;
      deleteTheNews(singleNews.id);
    }
  })
)(SingleNews);
