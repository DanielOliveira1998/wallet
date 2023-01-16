// Coloque aqui suas actions
import getCoinsAPIData from '../../services/awasomeAPI';

export const REQUEST_API = 'REQUEST_API';
export const RESQUEST_SUCCESS_API = 'RESQUEST_SUCCESS_API';
export const ADD_LOGIN_INFO = 'ADD_LOGIN_INFO';

const requestAPICoins = () => ({
  type: requestAPICoins,
});

const responseAPISuccess = (response) => ({
  type: RESQUEST_SUCCESS_API,
  payload: {
    response,
  },
});

export const fetchAPICoinsData = () => async (dispatch) => {
  dispatch(requestAPICoins);
  const response = await getCoinsAPIData();
  dispatch(responseAPISuccess(response));
};

export const addLoginInfo = (email) => ({
  type: ADD_LOGIN_INFO,
  payload: {
    email,
  },
});
