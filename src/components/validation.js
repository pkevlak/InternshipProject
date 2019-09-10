const required = value => (value ? undefined : 'Required');
const minLength = value => (value.length > 6 ? undefined : 'Must be 6 characters or more');
const maxLength = value => (value.length < 100 ? undefined : 'Must be less than 100 characters');
const matchesPassword = (value, allValues) => (value === allValues.password ? undefined : 'Passwords must match');
const checkEmail = (value) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(value) ? undefined : 'Not valide email';
};

export {
  required,
  minLength,
  matchesPassword,
  checkEmail,
  maxLength
};
