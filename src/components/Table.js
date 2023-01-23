import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses, ask, expensesValue } = this.props;
    return (
      <div>
        {expenses.length > 0 ? expenses.map((expnesesItem) => (
          <table border="1" key={ expnesesItem.id }>
            <th>
              <tr>Descrição</tr>
              <tr>{expnesesItem.description}</tr>
            </th>
            <th>
              <tr>Tag</tr>
              <tr>{expnesesItem.tag}</tr>
            </th>
            <th>
              <tr>Método de pagamento</tr>
              <tr>{expnesesItem.method}</tr>
            </th>
            <th>
              <tr>Valor</tr>
              <tr>{expnesesItem.value}</tr>
            </th>
            <th>
              <tr>Moeda</tr>
              <tr>{expnesesItem.exchangeRates[expnesesItem.currency].name}</tr>
            </th>
            <th>
              <tr>Câmbio utilizado</tr>
              <tr>{Number(ask[expnesesItem.id]).toFixed(2)}</tr>
            </th>
            <th>
              <tr>Valor convertido</tr>
              <tr>{expensesValue[expnesesItem.id].toFixed(2)}</tr>
            </th>
            <th>
              <tr>Moeda de conversão</tr>
              <tr>Real</tr>
            </th>
            <th>
              <tr>Editar/Excluir</tr>
            </th>
          </table>
        ))
          : (
            <table border="1">
              <th>
                <tr>Descrição</tr>
                <tr>a</tr>
              </th>
              <th>
                <tr>Tag</tr>
                <tr>a</tr>
              </th>
              <th>
                <tr>Método de pagamento</tr>
                <tr>a</tr>
              </th>
              <th>
                <tr>Valor</tr>
                <tr>a</tr>
              </th>
              <th>
                <tr>Moeda</tr>
                <tr>a</tr>
              </th>
              <th>
                <tr>Câmbio utilizado</tr>
                <tr>a</tr>
              </th>
              <th>
                <tr>Valor convertido</tr>
                <tr>a</tr>
              </th>
              <th>
                <tr>Moeda de conversão</tr>
                <tr>a</tr>
              </th>
              <th>
                <tr>Editar/Excluir</tr>
              </th>
            </table>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.apiResponse,
  ask: state.wallet.ask,
  expensesValue: state.wallet.expensesValue,
});

Table.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
