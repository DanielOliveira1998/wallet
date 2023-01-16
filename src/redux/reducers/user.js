import { ADD_LOGIN_INFO } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN_INFO: {
    return {
      ...state,
      email: action.payload.email,
    };
  }
  default: return state;
  }
};

export default user;
