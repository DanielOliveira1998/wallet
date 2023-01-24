import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';
import App from '../App';

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

  test('Vewrifica se a tabela é preenchida', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<App />);
    const emailTest = 'test@test.com';
    const passowordInput = screen.getByPlaceholderText(/senha/i);
    const emailInput = screen.getByRole('textbox');
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeDisabled();
    userEvent.type(emailInput, emailTest);
    userEvent.type(passowordInput, '123456');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    waitFor(() => {
      expect(pathname).tobe('/carteira');
    });
  });
});
