import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends PureComponent {
  static propTypes = {
    children: PropTypes.array.isRequired,
  }

  state = {
    error: null
  }

  componentDidCatch(error) {
    this.setState({error});
  }

  render() {
    const {error} = this.state;
    const {children} = this.props;
    return (
      error ? <p>Something went wrong, sorry.</p> : children);
  }
}

export default ErrorBoundary;
