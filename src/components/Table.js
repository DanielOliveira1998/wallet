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
    const { expenses } = this.props;
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
          {expenses.map((expensesItem) => (
            <tr key={ expensesItem.id }>
              <td>{expensesItem.description}</td>
              <td>{expensesItem.tag}</td>
              <td>{expensesItem.method}</td>
              <td>{Number(expensesItem.value).toFixed(2)}</td>
              <td>{expensesItem.exchangeRates[expensesItem.currency].name}</td>
              <td>
                {Number(expensesItem
                  .exchangeRates[expensesItem.currency].ask).toFixed(2)}

              </td>
              <td>
                {(Number(expensesItem.value) * Number(expensesItem
                  .exchangeRates[expensesItem.currency].ask)).toFixed(2)}

              </td>
              <td>Real</td>
              <td>
                <td>
                  <button type="button">Editar</button>
                  <button
                    type="button"
                    // name={ expnesesItem.id }
                    // onClick={ this.deleteExpense(expensesItem) }
                  >
                    Excluir

                  </button>
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
