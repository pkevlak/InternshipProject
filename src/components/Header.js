import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {reset} from 'redux-form';
import styled from '@emotion/styled/macro';
import {compose, withHandlers, pure} from 'recompose';
import PropTypes from 'prop-types';
import {getCurrentUser, setCurrentUser} from '../reducers/users';
import {addSearch, getSearch} from '../reducers/search';
import SearchForm from './SearchForm';
import homeIcon from './images/homeicon.png';
import resetIcon from './images/reset.png';

const HomeButton = styled.button`
  position: relative;
  left: 200px;
  top: 8px;
  background:url(${homeIcon});
  cursor:pointer;
  border:none;
  width:50px;
  height:50px;
  outline: none;
`;

const LoginContainer = styled.div`
  position: absolute;
  top: 23px;
`;

const LoginButton = styled.button`
  position: relative;
  left: 1500px;
  background-color: transparent;
  border-color: black;
  border-style: solid;
  border-width: 2px;
  border-radius: 3px;
  width:200px;
  height:35px;
  font-size: 20px;
  cursor:pointer;
  outline: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const UserName = styled.h1`
  position: relative;
  bottom: 152px;
  left: 1420px;
  width: 100px;
`;

const ResetButton = styled.button`
  position: relative;
  left: 230px;
  top: 10px;
  background:url(${resetIcon});
  cursor:pointer;
  border:none;
  width:50px;
  height:50px;
  outline: none;
`;

const HeaderContainer = styled.div`
  height: 65px;
`;

const Header = ({
  user, signForm, signUpForm, handleLogOut, handleResetButton, search
}) => (
  <HeaderContainer>
    <Link to="/"><HomeButton type="button" /></Link>
    {search !== '' && <ResetButton type="button" onClick={handleResetButton} />}
    <SearchForm />
    {user.role !== 'notReg' && <UserName>{user.name}</UserName>}
    {signForm === undefined && signUpForm === undefined
    && (
    <LoginContainer>{(user.role !== 'notReg'
      ? <LoginButton onClick={handleLogOut} type="button">Log Out</LoginButton>
      : <StyledLink to="/SignIn"><LoginButton type="button">Sign In/Sign Up</LoginButton></StyledLink>)}
    </LoginContainer>
    )
    }
  </HeaderContainer>
);

Header.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogOut: PropTypes.func.isRequired,
  signForm: PropTypes.object,
  signUpForm: PropTypes.object,
  handleResetButton: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired
};

Header.defaultProps = {
  signForm: undefined,
  signUpForm: undefined
};

const mapStateToProps = state => ({
  user: getCurrentUser(state),
  signForm: state.form.signForm,
  signUpForm: state.form.signUpForm,
  search: getSearch(state),
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: value => dispatch(setCurrentUser(value)),
  addSearch: value => dispatch(addSearch(value)),
  clearForm: () => dispatch(reset('searchForm')),
});

export default compose(
  pure,
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    handleLogOut: props => () => {
      const {setCurrentUser} = props;
      setCurrentUser({
        role: 'notReg'
      });
    },
    handleResetButton: props => () => {
      const {addSearch, clearForm} = props;
      addSearch('');
      clearForm();
    }
  })
)(Header);

export {StyledLink};
