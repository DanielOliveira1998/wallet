// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_API, REQUEST_SUCCESS_API,
  REQUEST_FAILURE_API, ADD_FINANCE_INFO } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  isLoading: false,
  apiResponse: {},
  error: null,
  expensesValue: [],
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
    return {
      ...state,
      isLoading: false,
      apiResponse: action.payload.apiResponse,
      currencies: currencyArrFiltered || {},
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
    console.log(action.payload.expensesValue);
    return {
      ...state,
      expenses: [...state.expenses, [action.payload.walletItens]],
      expensesValue: [...state.expensesValue, action.payload.expensesValue],
    };
  }
  // case SUM_FINANCE_VALUE: {
  //   return {
  //     ...state,
  //     totalSum: state.wallet.expenses.reduce((acc,curr) => acc + (curr.value))
  //   }
  // }
  default: return state;
  }
};

export default wallet;
