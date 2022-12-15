import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      email: '',
      password: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm());
  };

  validateForm = () => {
    const { email, password } = this.state;
    const passwordLengthMin = 4;
    const emailValidateRegex = /\S+@\S+\.\S+/;
    const emailValidate = emailValidateRegex.test(email);
    const passwordValidate = password.length > passwordLengthMin;
    if ((emailValidate && passwordValidate) === true) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  pushHistory = () => {
    const { history } = this.props;
    history.push('/carteira');
  };

  render() {
    const { isDisabled, email, password } = this.state;
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="Email"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            type="password"
            placeholder="senha"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </div>
        <button
          type="button"
          onClick={ this.pushHistory }
          disabled={ isDisabled }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
