import guid from '../utils';

const initialState = {
  news: [],
  loading: false
};

const news = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEWS':
      return {
        ...state,
        news: action.payload
      };
    case 'CHANGE_LOADING':
      return {
        ...state,
        loading: !state.loading
      };
    case 'ADD_THE_NEWS':
      return {
        ...state,
        news: [action.payload, ...state.news]
      };
    case 'DELETE_NEWS':
      return {
        ...state,
        news: state.news.filter(theNews => theNews.id !== action.payload)
      };
    case 'EDIT_NEWS':
      return {
        ...state,
        news: state.news.map((theNews) => {
          let editedNews = theNews;
          if (editedNews.id === action.payload.id) {
            editedNews = action.payload;
          }
          return editedNews;
        })
      };
    case 'ADD_COMMENT_TO_THE_NEWS':
      return {
        ...state,
        news: state.news.map((theNews) => {
          let theNewsToComment = theNews;
          if (theNewsToComment.id === action.payload[1]) {
            theNewsToComment = {...theNews};
            const commentsArray = [...theNewsToComment.comments];
            commentsArray.push(action.payload[0]);
            theNewsToComment.comments = commentsArray;
          }
          return theNewsToComment;
        })
      };
    case 'DELETE_COMMENT_FROM_THE_NEWS':
      return {
        ...state,
        news: state.news.map((theNews) => {
          let theNewsToDeleteComment = theNews;
          if (theNewsToDeleteComment.id === action.payload[1]) {
            theNewsToDeleteComment = {...theNews};
            theNewsToDeleteComment.comments = theNewsToDeleteComment.comments
              .filter(comment => comment.id !== action.payload[0]);
          }
          return theNewsToDeleteComment;
        })
      };
    default:
      return state;
  }
};

const loadNews = () => (dispatch) => {
  const api = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=100&category=business&apiKey=e13b364741624b378dff08cc792a7da1';
  dispatch({type: 'CHANGE_LOADING'});
  fetch(api)
    .then((res) => {
      dispatch({type: 'CHANGE_LOADING'});
      return res.json();
    })
    .then(news => news.articles)
    .then(articles => articles.map((article) => {
      const newArticle = {...article};
      newArticle.id = guid();
      newArticle.comments = [];
      return newArticle;
    }))
    .then(result => dispatch({
      type: 'ADD_NEWS',
      payload: result
    }))
    .catch((error) => {
      console.log(`Problem with fetch operation: ${error.message}`);
    });
};

const addTheNews = theNews => ({
  type: 'ADD_THE_NEWS',
  payload: theNews
});

const deleteTheNews = newsId => ({
  type: 'DELETE_NEWS',
  payload: newsId
});

const editTheNews = theNews => ({
  type: 'EDIT_NEWS',
  payload: theNews
});

const addCommentToNews = (comment, id) => ({
  type: 'ADD_COMMENT_TO_THE_NEWS',
  payload: [comment, id]
});

const deleteCommentFromNews = (commentId, id) => ({
  type: 'DELETE_COMMENT_FROM_THE_NEWS',
  payload: [commentId, id]
});

const getNews = state => state.news.news;
const getLoading = state => state.news.loading;


export default news;

export {
  loadNews,
  deleteTheNews,
  getNews,
  addCommentToNews,
  deleteCommentFromNews,
  addTheNews,
  editTheNews,
  getLoading
};
