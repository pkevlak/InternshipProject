import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled/macro';
import SingleNews from './SingleNews';

const RandomNewsContainer = styled.div`
  position: absolute;
  left: 1500px;
  top: 49px;
  padding: 10px;
  border:1px solid black;
`;

class RandomNews extends PureComponent {
  static propTypes = {
    news: PropTypes.array.isRequired
  }

  state = {
    randomNewsIndex: Math.floor(Math.random() * 15),
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState(
      {randomNewsIndex: this.randomInteger()}
    ), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  randomInteger = () => {
    const {news} = this.props;
    return Math.floor(Math.random() * news.length);
  }

  render() {
    const {news} = this.props;
    const {randomNewsIndex} = this.state;
    const randomNews = {...news[randomNewsIndex]};
    return (
      <RandomNewsContainer>
        <h1>Maybe you will be interested in...</h1>
        <SingleNews imageSize="randNews" singleNews={randomNews} />
      </RandomNewsContainer>
    );
  }
}

export default RandomNews;
