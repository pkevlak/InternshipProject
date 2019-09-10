const initialState = {
  pageOfItems: []
};

const pages = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ITEMS_PAGE':
      return {
        ...state,
        pageOfItems: action.payload
      };
    default:
      return state;
  }
};

const setItemsPage = pageOfItems => ({
  type: 'SET_ITEMS_PAGE',
  payload: pageOfItems
});

const getPages = state => state.pages.pageOfItems;

export default pages;

export {
  setItemsPage,
  getPages
};
