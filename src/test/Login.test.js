import { screen, fireEvent } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
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
  // https://testing-library.com/docs/example-input-event/
  test('Verifica se o botão de login é habilitado ao preencher os campos.', () => {
    renderWithRouterAndRedux(<App />);
    const passowordInput = screen.getByPlaceholderText(/senha/i);
    const emailInput = screen.getByRole('textbox');
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeDisabled();
    fireEvent.change(
      emailInput,
      { target: { value: 'test@test.com' } },
    );
    fireEvent.change(
      passowordInput,
      { target: { value: '123456' } },
    );
  });
  expect(emailInput.value).toEqual('test@test.com');
});
