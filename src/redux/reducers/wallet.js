// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API, REQUEST_SUCCESS_API,
  REQUEST_FAILURE_API, ADD_FINANCE_INFO, DEL_FINANCE_INFO,
  EDITOR_MODE, MODIFY_FINANCE_INFO } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isLoading: false,
  apiResponse: {},
  error: null,
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
    const currencyArr = Object.keys(action.payload.apiResponse);
    const currencyArrFiltered = currencyArr.filter((coinDel) => coinDel !== 'USDT');
    let currencyNameArr = [];
    for (let index = 0; index < currencyArr.length; index += 1) {
      currencyNameArr = [...currencyNameArr,
        { [currencyArr[index]]: action.payload.apiResponse[currencyArr[index]].name }];
    }
    return {
      ...state,
      isLoading: false,
      apiResponse: action.payload.apiResponse,
      currencies: currencyArrFiltered || {},
    };
  }
  case REQUEST_FAILURE_API: {
    return {
      ...state, isLoading: false, error: action.payload.error,
    };
  }
  case ADD_FINANCE_INFO: {
    return {
      ...state, expenses: [...state.expenses, action.payload.walletItens],
    };
  }
  case DEL_FINANCE_INFO: {
    console.log('DEL_FINANCE_INFO', action.payload.expenses);
    return {
      ...state, expenses: action.payload.expenses,
    };
  }
  case EDITOR_MODE: {
    return {
      ...state, idToEdit: action.payload.id, editor: true,
    };
  }
  case MODIFY_FINANCE_INFO: {
    return {
      ...state, expenses: action.payload.expense, editor: false,
    };
  }
  default: return state;
  }
};

export default wallet;
