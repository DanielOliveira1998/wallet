import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div>
        <h3 data-testid="email-field">email</h3>
        <h3 data-testid="total-field">Despesa total: 0</h3>
        <h3 data-testid="header-currency-field">Moeda: BRL</h3>
      </div>
    );
  }
}

export default Header;
