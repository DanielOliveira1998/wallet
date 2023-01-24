import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux, renderWithRouterAndRedux } from '../tests/helpers/renderWith';
import App from '../App';
import WalletForm from '../components/WalletForm';
import reduxMock from './reduxMock';

describe('Testa a página Wallet', () => {
  test('Verifica se o coteúdo da tela esta sendo renderizado', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<App />);
    const passowordInput = screen.getByPlaceholderText(/senha/i);
    const emailInput = screen.getByRole('textbox');
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeDisabled();
    userEvent.type(emailInput, 'test2@test.com');
    userEvent.type(passowordInput, '123456');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    waitFor(() => {
      expect(pathname).tobe('/carteira');
    });

    const email = screen.getByRole('heading', { name: 'test2@test.com' });
    const value = screen.getByRole('heading', { name: /0\.00/i });
    const currency = screen.getByRole('heading', { name: /moeda: brl/i });
    const valueLabel = screen.getByText(/valor:/i);
    const desciptionLabel = screen.getByText(/descrição:/i);
    const methodLabel = screen.getByText(/método de pagamento:/i);
    const categoryLabel = screen.getByText(/categoria:/i);
    expect(email).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(valueLabel).toBeInTheDocument();
    expect(desciptionLabel).toBeInTheDocument();
    expect(methodLabel).toBeInTheDocument();
    expect(categoryLabel).toBeInTheDocument();
  });

  test('Verifica se a tabela é preenchida', () => {
    renderWithRedux(<WalletForm />);
    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getAllByTestId('method-input');
    const tagsInput = screen.getAllByTestId('tag-input');
    const button = screen.getByRole('button');

    userEvent.type(valueInput, '11');
    userEvent.type(descriptionInput, 'test');
    userEvent.type(currencyInput, 'USD');
    userEvent.type(methodInput, 'Dinheiro');
    userEvent.type(tagsInput, 'Lazer');
    userEvent.click(button);
    waitFor(() => {
      expect(screen.getByRole('cell', { name: /dólar americano\/realbrasileiro/i }));
    });
  });

  test('Head', () => {
    const { history: {
      location: { pathname } } } = renderWithRouterAndRedux(<App />, {}, reduxMock);
    const passowordInput = screen.getByPlaceholderText(/senha/i);
    const emailInput = screen.getByRole('textbox');
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeDisabled();
    expect(pathname).toBe('/');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passowordInput, '123456');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    waitFor(() => {
      expect(pathname).tobe('/carteira');
    });
    const textValue = screen.getByText(/valor:/i);
    const textDesc = screen.getByText(/descrição:/i);
    userEvent.type(textValue, '11');
    userEvent.type(textDesc, 'test');
    expect(reduxMock.wallet.expenses[0].value).toEqual('11');
  });
});
