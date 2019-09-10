import React, {PureComponent} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from '@emotion/styled/macro';
import PropTypes from 'prop-types';
import Header from './Header';
import MainPage from './MainPage';
import AddNews from './AddNews';
import News from './News';
import SignIn from './SignIn';
import EditNews from './EditNews';
import SignUp from './SignUp';
import NotFound from './NotFound';
import {addUsers} from '../reducers/users';
import {loadNews} from '../reducers/news';
import users from '../dummy_data/users.json';
import ErrorBoundary from './ErrorBoundary';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

class App extends PureComponent {
  static propTypes = {
    addUsers: PropTypes.func.isRequired,
    loadNews: PropTypes.func.isRequired
  }

  componentWillMount() {
    const {addUsers} = this.props;
    const {loadNews} = this.props;
    addUsers(users);
    loadNews();
  }

  render() {
    return (
      <BrowserRouter>
        <AppContainer>
          <ErrorBoundary>
            <Header />
            <Switch>
              <Route path="/" component={MainPage} exact />
              <Route path="/news/:id" component={News} />
              <Route path="/addNews" component={AddNews} />
              <Route path="/editNews" component={EditNews} />
              <Route path="/signIn" component={SignIn} />
              <Route path="/signUp" component={SignUp} />
              <Route path="/notFound" component={NotFound} />
              <NotFound />
            </Switch>
          </ErrorBoundary>
        </AppContainer>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loadNews: () => dispatch(loadNews()),
  addUsers: value => dispatch(addUsers(value))
});

export default connect(null, mapDispatchToProps)(App);
