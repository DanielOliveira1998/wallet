import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { currencies } = this.props;
    const currencie = currencies || [];
    console.log(currencies);

    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input type="text" data-testid="value-input" name="value" />
        </label>
        <label htmlFor="description">
          Descrição:
          <input type="text" data-testid="description-input" name="description" />
        </label>
        <label htmlFor="coin">
          Moeda:
          <select name="coin" data-testid="currency-input">
            {currencie.map((coin) => (
              <option key={ coin } value={ coin }>{coin}</option>))}
          </select>
        </label>
        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select name="paymentMethod" data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select name="tag" data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
