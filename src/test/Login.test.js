import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from '../tests/helpers/renderWith';
import App from '../App';

describe('Testa a página Login', () => {
  test('Contém dois inputs e um botão.', () => {
    renderWithRouterAndRedux(<App />);
    const passowordInput = screen.getByPlaceholderText(/senha/i);
    const emailInput = screen.getByRole('textbox');
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(emailInput).toBeInTheDocument();
    expect(passowordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Verifica se o botão de login é habilitado ao preencher os campos.', () => {
    renderWithRouterAndRedux(<App />);
    const emailTest = 'test@test.com';
    const passowordInput = screen.getByPlaceholderText(/senha/i);
    const emailInput = screen.getByRole('textbox');
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeDisabled();
    userEvent.type(emailInput, emailTest);
    userEvent.type(passowordInput, '123456');
    expect(emailInput.value).toEqual(emailTest);
    expect(passowordInput.value).toEqual('123456');
    expect(loginButton).toBeEnabled();
  });

  test('Verifica se o botão de login redireciona o usuria ao rota /carteira', () => {
    const { history: { location: { pathname } } } = renderWithRouterAndRedux(<App />);
    const passowordInput = screen.getByPlaceholderText(/senha/i);
    const emailInput = screen.getByRole('textbox');
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeDisabled();
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passowordInput, '123456');
    expect(loginButton).toBeEnabled();
    userEvent.click(loginButton);
    waitFor(() => {
      expect(pathname).tobe('/carteira');
    });
  });
});
