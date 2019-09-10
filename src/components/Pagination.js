import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from '@emotion/styled/macro';
import {setItemsPage} from '../reducers/pages';
import {getSearch} from '../reducers/search';
import guid from '../utils';

const PaginationList = styled.ul`
  position: relative;
  left: -42px;
  bottom: 3px;
  width: 780px;
  & li {
    list-style-type: none;
    display: inline;
  }
`;

const PaginationElement = styled.li`
  pointer-events: ${props => (props.disabled && 'none')};
  opacity: ${props => (props.disabled && '0.6')};
`;

const StringPaginationButton = styled.button`
  width: 100px;
  height: 30px;
  border-style: solid;
  border-color: black;
  cursor:pointer;
  background-color: transparent;
  font-size: 20px;
  outline: none;
`;

const NumberPaginationButton = styled.button`
  width: 76px;
  height: 30px;
  border-style: solid;
  border-color: black;
  cursor:pointer;
  background-color: transparent;
  font-size: 20px;
  outline: none;
`;

class Pagination extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    setItemsPage: PropTypes.func.isRequired
  };

  state = {
    pager: {},
    initialPage: 1,
    pageSize: 15
  };

  componentDidMount() {
    const {initialPage} = this.state;
    this.setPage(initialPage);
  }

  componentDidUpdate(prevProps) {
    const {items} = this.props;
    const {initialPage} = this.state;
    if (items !== prevProps.items) {
      this.setPage(initialPage);
    }
  }

  setPage = (page) => {
    const {items, setItemsPage} = this.props;
    const {pageSize} = this.state;
    let {pager} = this.state;
    pager = this.getPager(items.length, page, pageSize);
    const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
    this.setState({pager});
    setItemsPage(pageOfItems);
  }

  getPager = (totalItems, page) => {
    const currentPage = page || 1;
    const {pageSize} = this.state;
    const totalPages = Math.ceil(totalItems / pageSize);
    const paginationPages = 5;
    let startPage = 1;
    let endPage = totalPages;
    const paginationPagesHalf = paginationPages / 2;
    if (totalPages <= 5) {
      endPage = totalPages;
    } else if (currentPage <= paginationPagesHalf) {
      endPage = paginationPages;
    } else if (currentPage + paginationPagesHalf >= totalPages) {
      startPage = totalPages - paginationPages + 1;
      endPage = totalPages;
    } else if (paginationPages % 2 !== 0) {
      startPage = currentPage - Math.floor(paginationPagesHalf);
      endPage = currentPage + Math.floor(paginationPagesHalf);
    } else {
      startPage = currentPage - paginationPagesHalf + 1;
      endPage = currentPage + paginationPagesHalf;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  render() {
    const {pager} = this.state;

    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }

    return (
      <PaginationList>
        <PaginationElement disabled={pager.currentPage === 1 && true}>
          <StringPaginationButton type="button" onClick={() => this.setPage(1)}>First</StringPaginationButton>
        </PaginationElement>
        <PaginationElement disabled={pager.currentPage === 1 && true}>
          <StringPaginationButton type="button" onClick={() => this.setPage(pager.currentPage - 1)}>Previous</StringPaginationButton>
        </PaginationElement>
        {pager.pages.map(page => (
          <PaginationElement key={guid()}>
            <NumberPaginationButton type="button" onClick={() => this.setPage(page)}>{page}</NumberPaginationButton>
          </PaginationElement>
        ))}
        <PaginationElement disabled={pager.currentPage === pager.totalPages && true}>
          <StringPaginationButton type="button" onClick={() => this.setPage(pager.currentPage + 1)}>Next</StringPaginationButton>
        </PaginationElement>
        <PaginationElement disabled={pager.currentPage === pager.totalPages && true}>
          <StringPaginationButton type="button" onClick={() => this.setPage(pager.totalPages)}>Last</StringPaginationButton>
        </PaginationElement>
      </PaginationList>
    );
  }
}

const mapStateToProps = state => ({
  search: getSearch(state)
});

export default connect(mapStateToProps, {setItemsPage})(Pagination);
