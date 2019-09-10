const initialState = {
  users: [],
  currentUser: {
    name: 'Paul',
    role: 'notReg'
  },
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USERS':
      return {
        ...state,
        users: action.payload
      };
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case 'SET_CUR_USER':
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

const addUsers = users => ({
  type: 'ADD_USERS',
  payload: users
});

const setCurrentUser = user => ({
  type: 'SET_CUR_USER',
  payload: user
});

const addUser = user => ({
  type: 'ADD_USER',
  payload: user
});

const getCurrentUser = state => state.users.currentUser;

const getUsers = state => state.users.users;

export default users;

export {
  addUsers,
  setCurrentUser,
  getCurrentUser,
  getUsers,
  addUser
};
