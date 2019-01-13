import React, { Component } from 'react'
import Types from 'prop-types'

import './LoginForm.scss'

class LoginForm extends Component {
  constructor (props) {
    super(props)

    this.INPUT_REQUIRED = 'input-required'
    this.INPUT_CORRECT = 'input-correct'
    this.INPUT_WRONG = 'input-wrong'

    this.state = {
      emailValue: props.email || '',
      emailStatus: this.INPUT_REQUIRED,
      passValue: '',
      passStatus: this.INPUT_REQUIRED
    }
  }

  render () {
    return (
      <form className='login-form'>

        <div className='login-form-group'>
          <label className='login-label'>
            Email:
          </label>
          <input
            className={`login-input ${this.state.emailStatus}`}
            type='text' value={this.state.emailValue}
            onChange={this.onEmailChange} placeholder={'Email'}/>
        </div>

        <div className='login-form-group'>
          <label className='login-label'>
            Password:
          </label>
          <input
            className={`login-input ${this.state.passStatus}`}
            type='password' value={this.state.passValue}
            onChange={this.onPassChange} placeholder={'Password'}/>
        </div>

        <button className={`login-button ${this.updateButtonStyle()}`}
          onClick={this.handleSubmit}>
          Log In
        </button>

      </form>
    )
  }

  onEmailChange = (event) => {
    const newInput = event.target.value
    this.setState({
      emailValue: newInput,
      emailStatus: newInput.length === 0 ? this.INPUT_REQUIRED
        : /(\w)+@(\w)+\.{1}\w{1,5}/.test(newInput) ? this.INPUT_CORRECT
          : this.INPUT_WRONG
    })
  }

  onPassChange = (event) => {
    const newInput = event.target.value
    this.setState({
      passValue: newInput,
      passStatus: newInput.length === 0 ? this.INPUT_REQUIRED
        : newInput.length > 5 ? this.INPUT_CORRECT
          : this.INPUT_WRONG
    })
  }

  updateButtonStyle = () => {
    const s = this.state
    return ((s.emailStatus === this.INPUT_CORRECT) &&
      (s.passStatus === this.INPUT_CORRECT))
      ? 'button-ready' : 'button-pending'
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onLogin(
      this.state.emailValue,
      this.state.passValue
    )
  }
}

LoginForm.propTypes = {
  email: Types.string,
  onLogin: Types.func.isRequired
}

export default LoginForm
