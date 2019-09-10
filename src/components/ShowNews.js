import React from 'react';
import {connect} from 'react-redux';
import styled from '@emotion/styled/macro';
import {keyframes} from '@emotion/core';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import SingleNews from './SingleNews';
import {getPages} from '../reducers/pages';
import {getLoading} from '../reducers/news';
import guid from '../utils';

const NewsContainer = styled.div`
  position: absolute;
  left: 8%;
  top: 10%;
`;

const TheNews = styled.div`
  width: 780px;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid black; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`;

const ShowNews = ({news, pages, loading}) => (
  <NewsContainer>
    <TheNews>
      {pages.map(item => <SingleNews key={guid()} singleNews={item} />)}
      {loading ? <Loader /> : <Pagination items={news} />}
    </TheNews>
  </NewsContainer>
);

ShowNews.propTypes = {
  news: PropTypes.array.isRequired,
  pages: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  pages: getPages(state),
  loading: getLoading(state)
});

export default connect(mapStateToProps)(ShowNews);
