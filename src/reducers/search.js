const initialState = {
  search: ''
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SEARCH':
      return {
        search: action.payload
      };
    default:
      return state;
  }
};

const addSearch = search => ({
  type: 'ADD_SEARCH',
  payload: search
});

const getSearch = state => state.search.search;

export default search;

export {
  addSearch,
  getSearch
};
