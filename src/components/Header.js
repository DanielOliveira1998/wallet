import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalExpenseSum = () => {
    const { expensesValue } = this.props;
    if (expensesValue.length !== 0) {
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
  expensesValue: state.wallet.expensesValue,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
