import mockData from '../tests/helpers/mockData';

const INITIAL_STATE = {
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        value: '11',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
        id: 0,
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
    isLoading: false,
    apiResponse: mockData,
    error: null,
  },
  user: {
    email: '',
  },
};

export default INITIAL_STATE;
