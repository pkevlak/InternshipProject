import React from 'react';
import PropTypes from 'prop-types';
import SignInForm from './SignInForm';
import {CenteredDiv} from './AddNews';

const SignIn = ({history}) => (
  <CenteredDiv>
    <h1>Sign In</h1>
    <SignInForm history={history} />
  </CenteredDiv>
);

SignIn.propTypes = {
  history: PropTypes.object.isRequired
};

export default SignIn;
