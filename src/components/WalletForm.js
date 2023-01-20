import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFinanceInfo } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      coin: '',
      paymentMethod: '',
      tag: '',
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
  };

  concatenateWalletItens = () => {
    const { value, description, coin, paymentMethod, tag } = this.state;
    const walletItens = [value, description, coin, paymentMethod, tag];
    console.log(`WalletItens ${walletItens}`);
    this.saveFinanceInfo(walletItens);
  };

  render() {
    const { currencies, expenses } = this.props;
    const { value, description, coin, paymentMethod, tag } = this.state;
    const currencie = currencies || [];
    console.log(expenses);

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
        <label htmlFor="coin">
          Moeda:
          <select
            name="coin"
            value={ coin }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {currencie.map((coins) => (
              <option key={ coins } value={ coins }>{coins}</option>))}
          </select>
        </label>
        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select
            name="paymentMethod"
            value={ paymentMethod }
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
          onClick={ this.concatenateWalletItens }
        >
          Adicionar despesa

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
