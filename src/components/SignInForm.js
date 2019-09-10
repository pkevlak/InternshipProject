import React from 'react';
import {
  Field, reduxForm, SubmissionError
} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {getUsers, setCurrentUser} from '../reducers/users';
import InputField from './InputField';
import {FormButton} from './CommentForm';
import {StyledLink} from './Header';

const SignInForm = ({handleSubmit}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <Field
        name="email"
        type="email"
        className="inputField"
        placeholder="Email"
        component={InputField}
      />
      <br />
      <Field
        name="password"
        type="password"
        placeholder="Password"
        className="inputField"
        component={InputField}
      />
      <br />
      <FormButton type="submit">Sign</FormButton>
      <StyledLink to="/SignUp"><FormButton type="button">Registration</FormButton></StyledLink>
    </form>
  </div>
);

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  users: getUsers(state)
});

export default compose(
  connect(mapStateToProps, {setCurrentUser}),
  reduxForm({
    form: 'signForm',
    onSubmit: (values, dispatch, props) => {
      const {users, setCurrentUser, history} = props;
      const userArray = users.filter(user => user.email === values.email);
      if (userArray.length === 0) {
        throw new SubmissionError(
          {
            email: 'There is not user with such email'
          }
        );
      } else if (userArray[0].password === values.password) {
        setCurrentUser(userArray[0]);
        history.push('/');
      } else {
        throw new SubmissionError(
          {
            password: 'Wrong password'
          }
        );
      }
    }
  })
)(SignInForm);
