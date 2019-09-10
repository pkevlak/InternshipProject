import React from 'react';
import PropTypes from 'prop-types';
import SignUpForm from './SignUpForm';
import {CenteredDiv} from './AddNews';

const SignUp = ({history}) => (
  <CenteredDiv>
    <h1>SignUp</h1>
    <SignUpForm history={history} />
  </CenteredDiv>
);

SignUp.propTypes = {
  history: PropTypes.object.isRequired
};

export default SignUp;
