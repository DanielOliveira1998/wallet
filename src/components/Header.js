import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpenseSum = () => {
    const { expenses } = this.props;
    if (expenses.length !== 0) {
      // const expensesValue = expenses.map((expense) => Number(expense.value));
      const expensesValue = expenses.map((expense) => Number(expense.value)
      * Number(expense
        .exchangeRates[expense.currency].ask));
      const expensesSum = expensesValue.reduce((acc, curr) => acc + curr);
      return expensesSum.toFixed(2);
    }
    return '0.00';
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <h3 data-testid="email-field">{email}</h3>
        <h3 data-testid="total-field">
          {this.totalExpenseSum()}
        </h3>
        <h3 data-testid="header-currency-field">Moeda: BRL</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
