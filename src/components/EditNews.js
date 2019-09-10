import React from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {
  compose,
  mapProps,
  pure,
  withHandlers
} from 'recompose';
import {editTheNews} from '../reducers/news';
import {getCurrentUser} from '../reducers/users';
import NewsForm from './NewsForm';
import {CenteredDiv} from './AddNews';

const EditNews = ({
  user, source, curNews, submit
}) => (
  <div>
    {user.role !== 'admin' && <Redirect to="/notFound" />}
    <CenteredDiv>
      <h1>EditNews</h1>
      <NewsForm
        initialValues={{
          source: curNews.source,
          title: curNews.title,
          author: source,
          description: curNews.description,
          url: curNews.url,
          urlToImage: curNews.urlToImage,
          publishedAt: curNews.publishedAt,
          content: curNews.content,
          id: curNews.id,
          comments: curNews.comments
        }}
        onSubmit={submit}
      />
    </CenteredDiv>
  </div>
);

EditNews.propTypes = {
  source: PropTypes.string.isRequired,
  curNews: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: getCurrentUser(state)
});

export default compose(
  pure,
  mapProps(({location, ...other}) => {
    const {aboutProps} = location;
    const {curNews} = aboutProps;
    const source = curNews.author === null ? curNews.source.name : curNews.author;
    return {
      ...other,
      source,
      curNews
    };
  }),
  connect(mapStateToProps, {editTheNews}),
  withHandlers({
    submit: props => (values) => {
      const {initialValues, editTheNews, history} = props;
      const editedNews = {...values};
      const date = new Date(values.publishedAt);
      editedNews.publishedAt = date.toISOString();
      if (initialValues !== values) {
        editTheNews(editedNews);
      }
      history.push(`/news/${values.id}`);
    }
  })
)(EditNews);
