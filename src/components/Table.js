import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editorMode, delFinanceInfo } from '../redux/actions';

class Table extends Component {
  deleteExpense = (id) => {
    const { expenses, dispatch } = this.props;
    const deleteExpense = expenses
      .filter((expnesesItem) => expnesesItem.id !== id);
    // const expensesIdCorrection = deleteExpense.map((item, index) => {
    //   item.id = index;
    //   return item.id;
    // });
    console.log('DELETE EXPENSE', deleteExpense);
    dispatch(delFinanceInfo(deleteExpense));
  };

  editExpense = (id) => {
    const { dispatch } = this.props;
    dispatch(editorMode(id));
  };

  render() {
    const { expenses, editor } = this.props;
    // console.log(editor);
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
          {expenses && expenses.map((expensesItem) => (
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
                <button
                  type="button"
                  onClick={ () => this.editExpense(expensesItem.id) }
                  data-testid="edit-btn"
                >
                  Editar

                </button>
                <button
                  type="button"
                  onClick={ () => this.deleteExpense(expensesItem.id) }
                  data-testid="delete-btn"
                >
                  Excluir

                </button>
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
  editor: state.wallet.editor,
});

Table.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps)(Table);
