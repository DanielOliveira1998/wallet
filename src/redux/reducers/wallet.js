// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API, RESQUEST_SUCCESS_API } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API: {
    return {
      ...state,
      isLoading: true,
    };
  }
  case RESQUEST_SUCCESS_API: {
    return {
      ...state,
      isLoading: false,

    };
  }
  default: return state;
  }
};

export default wallet;
