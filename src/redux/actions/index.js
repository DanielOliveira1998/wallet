// Coloque aqui suas actions
import getCoinsAPIData from '../../services/awasomeAPI';

export const REQUEST_API = 'REQUEST_API';
export const REQUEST_SUCCESS_API = 'RESQUEST_SUCCESS_API';
export const REQUEST_FAILURE_API = 'REQUEST_FAILURE_API';
export const ADD_LOGIN_INFO = 'ADD_LOGIN_INFO';
export const ADD_FINANCE_INFO = 'ADD_FINANCY_INFO';
export const DEL_FINANCE_INFO = 'DEL_FINANCE_INFO';

const requestAPICoins = () => ({
  type: REQUEST_API,
});

const responseAPISuccess = (response) => ({
  type: REQUEST_SUCCESS_API,
  payload: {
    apiResponse: response,
  },
});

const responseAPIFailure = (error) => ({
  type: REQUEST_FAILURE_API,
  payload: {
    error,
  },
});

export const fetchAPICoinsData = () => async (dispatch) => {
  try {
    dispatch(requestAPICoins());
    const response = await getCoinsAPIData();
    dispatch(responseAPISuccess(response));
  } catch (error) {
    dispatch(responseAPIFailure('Erro durante requisição da API'));
  }
};

export const addLoginInfo = (email) => ({
  type: ADD_LOGIN_INFO,
  payload: {
    email,
  },
});

export const addFinanceInfo = (walletItens) => ({
  type: ADD_FINANCE_INFO,
  payload: {
    walletItens,
  },
});

export const delFinanceInfo = (expenses) => ({
  type: DEL_FINANCE_INFO,
  payload: {
    expenses,
  },
});
