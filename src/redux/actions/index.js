// Coloque aqui suas actions
import getCoinsAPIData from '../../services/awasomeAPI';

export const REQUEST_API = 'REQUEST_API';
export const RESQUEST_SUCCESS_API = 'RESQUEST_SUCCESS_API';

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
