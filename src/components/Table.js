import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     expenses: [],
  //   };
  // }

  // deleteExpense = ({ target }) => {
  //   const { expenses } = this.props;
  //   const idSelected = target.id;
  //   const deleteExpense = expenses
  //     .filter((expnesesItem) => expnesesItem.id !== idSelected);
  //   addFinanceInfo();
  // };

  render() {
    const { expenses, ask, expensesValue } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expnesesItem) => (
            <tr key={ expnesesItem.id }>
              <td>{expnesesItem.description}</td>
              <td>{expnesesItem.tag}</td>
              <td>{expnesesItem.method}</td>
              <td>{expnesesItem.value}</td>
              <td>{expnesesItem.exchangeRates[expnesesItem.currency].name}</td>
              <td>{Number(ask[expnesesItem.id]).toFixed(2)}</td>
              <td>{expensesValue[expnesesItem.id].toFixed(2)}</td>
              <td>Real</td>
              <td>
                <td>
                  <button type="button">Editar</button>
                  <button type="button">Excluir</button>
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
