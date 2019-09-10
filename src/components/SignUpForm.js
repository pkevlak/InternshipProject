import React from 'react';
import {
  Field, reduxForm, SubmissionError
} from 'redux-form';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {getUsers, setCurrentUser, addUser} from '../reducers/users';
import InputField from './InputField';
import {
  required, minLength, matchesPassword, checkEmail
} from './validation';
import {FormButton} from './CommentForm';
import {Error} from './NewsForm';

const SignUpForm = ({handleSubmit, reset, error}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        placeholder="Name"
        type="text"
        className="inputField"
        component={InputField}
        validate={[required, minLength]}
      />
      <br />
      <Field
        name="surname"
        placeholder="Surname"
        className="inputField"
        type="text"
        component={InputField}
        validate={[required, minLength]}
      />
      <br />
      <Field
        name="password"
        placeholder="Password"
        type="password"
        className="inputField"
        component={InputField}
        validate={[required, minLength]}
      />
      <br />
      <Field
        name="confirm"
        placeholder="Repeat password"
        type="password"
        className="inputField"
        component={InputField}
        validate={[required, minLength, matchesPassword]}
      />
      <br />
      <Field
        name="email"
        placeholder="Email"
        type="email"
        className="inputField"
        component={InputField}
        validate={[required, checkEmail]}
      />
      {error && <Error>{error}</Error>}
      <br />
      <FormButton type="submit">Registration</FormButton>
      <FormButton type="button" onClick={reset}>Clear</FormButton>
    </form>
  </div>
);

SignUpForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  error: PropTypes.string
};

SignUpForm.defaultProps = {
  error: undefined
};

const mapStateToProps = state => ({
  users: getUsers(state)
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: value => dispatch(setCurrentUser(value)),
  addUser: value => dispatch(addUser(value))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'signUpForm',
    onSubmit: (values, dispatch, props) => {
      const {
        users, setCurrentUser, addUser, history
      } = props;
      const userArray = users.filter(user => user.email === values.email);
      if (userArray.length !== 0) {
        throw new SubmissionError(
          {
            email: 'User with such email already exist'
          }
        );
      } else
      if (values.email !== undefined) {
        const newUser = {
          email: values.email,
          password: values.password,
          role: 'user',
          name: values.name,
          surname: values.surname
        };
        addUser(newUser);
        setCurrentUser(newUser);
        history.push('/');
      } else {
        throw new SubmissionError(
          {
            _error: 'Form is blank'
          }
        );
      }
    }
  })
)(SignUpForm);
