import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import {
  compose, pure, mapProps
} from 'recompose';
import RandomNews from './RandomNews';
import ShowNews from './ShowNews';
import {getCurrentUser} from '../reducers/users';
import {getNews} from '../reducers/news';
import {getSearch, addSearch} from '../reducers/search';
import addIcon from './images/add.png';

const RandomNewsConteiner = styled.div`
  position: relative;
`;

const AddButton = styled.button`
  position: absolute;
  left: 200px;
  top: 150px;
  width:500px;
  height:30px;
  background:url(${addIcon});
  cursor:pointer;
  border:none;
  width:50px;
  height:50px;
  outline: none;
`;

const MainPageContainer = styled.div`
  flex: auto;
`;

const MainPage = ({
  news, user, searchNews
}) => (
  <MainPageContainer>
    <RandomNewsConteiner>{user.role !== 'admin'
      ? <RandomNews news={news} />
      : <Link to="/addNews"><AddButton type="button" /></Link>}
    </RandomNewsConteiner>
    <ShowNews news={searchNews} />
  </MainPageContainer>
);

MainPage.propTypes = {
  news: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  searchNews: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  news: getNews(state),
  search: getSearch(state),
  user: getCurrentUser(state)
});

export default compose(
  pure,
  connect(mapStateToProps, {addSearch}),
  mapProps(({news, search, ...other}) => {
    const checkTheNews = (thenews) => {
      let isInclude = false;
      if (thenews.title !== null && thenews.description !== null) {
        if (thenews.title.toLowerCase().includes(search)
    || thenews.description.toLowerCase().includes(search)) {
          isInclude = true;
        }
      }
      return isInclude;
    };

    const searchNews = news.filter(
      (theNews => checkTheNews(theNews))
    );
    return {
      ...other,
      searchNews,
      news,
      search
    };
  })
)(MainPage);
