import {combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import users from './users';
import news from './news';
import search from './search';
import pages from './pages';

const rootReducer = combineReducers({
  users,
  news,
  search,
  pages,
  form: reduxFormReducer
});

export default rootReducer;
