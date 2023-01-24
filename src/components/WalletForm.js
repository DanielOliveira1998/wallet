import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFinanceInfo, fetchAPICoinsData, modifyFinanceInfo } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  saveFinanceInfo = (walletItens) => {
    const { dispatch } = this.props;
    dispatch(addFinanceInfo(walletItens));
    dispatch(fetchAPICoinsData());
  };

  concatenateWalletItens = () => {
    const { id, value, description, currency, method, tag } = this.state;
    const { exchangeRates, editor } = this.props;
    const walletItens = {
      value,
      currency,
      method,
      tag,
      description,
      id,
      exchangeRates,
    };
    if (editor) {
      this.handleEdit();
    } else {
      this.saveFinanceInfo(walletItens);
      this.setState((prev) => ({
        id: prev.id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      }));
    }
  };

  handleEdit = () => {
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, expenses, idToEdit } = this.props;
    const searchExpense = expenses.map((expense) => {
      console.log(expense.id, idToEdit);
      if (expense.id === idToEdit) {
        console.log('entrou if');
        return {
          ...expense,
          value,
          description,
          currency,
          method,
          tag,
        };
      }
      return expense;
    });
    console.log(this.state);
    dispatch(modifyFinanceInfo(searchExpense));
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const currencie = currencies || [];
    // console.log('walletform', editor);
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencie.map((coins) => (
              <option key={ coins } value={ coins }>{coins}</option>))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ () => this.concatenateWalletItens() }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.apiResponse,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
