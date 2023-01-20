// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API, REQUEST_SUCCESS_API,
  REQUEST_FAILURE_API, ADD_FINANCE_INFO } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
    isLoading: false,
    apiEesponse: {},
    error: null,
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API: {
    return {
      ...state,
      isLoading: true,
    };
  }
  case REQUEST_SUCCESS_API: {
    return {
      ...state,
      isLoading: false,
      apiResponse: action.payload.apiResponse,
      currencies: Object.keys(action.payload.apiResponse || {}),
    };
  }
  case REQUEST_FAILURE_API: {
    return {
      ...state,
      isLoading: false,
      error: action.payload.error,
    };
  }
  case ADD_FINANCE_INFO: {
    console.log(state);
    return {
      ...state,
      expenses: [action.payload.walletItens],
    };
  }
  default: return state;
  }
};

export default wallet;
