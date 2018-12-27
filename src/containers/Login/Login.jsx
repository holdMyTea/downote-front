import React from 'react'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.INPUT_REQUIRED = 'input-required'
    this.INPUT_CORRECT = 'input-correct'
    this.INPUT_WRONG = 'input-wrong'

    this.state = {
      emailValue: '',
      emailStatus: this.INPUT_REQUIRED,
      passValue: '',
      passStatus: this.INPUT_REQUIRED
    }

    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPassChange = this.onPassChange.bind(this)
    this.updateButtonStyle = this.updateButtonStyle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    return (
      <div className='login-container'>
        <div className='login-box'>
          <h3 className='login-header'>DowNote</h3>
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
        </div>
      </div>
    )
  }

  onEmailChange (event) {
    const newInput = event.target.value
    this.setState({
      emailValue: newInput,
      emailStatus: newInput.length === 0 ? this.INPUT_REQUIRED
        : /(\w)+@(\w)+\.{1}\w{1,5}/.test(newInput) ? this.INPUT_CORRECT
          : this.INPUT_WRONG
    })
  }

  onPassChange (event) {
    const newInput = event.target.value
    this.setState({
      passValue: newInput,
      passStatus: newInput.length === 0 ? this.INPUT_REQUIRED
        : newInput.length > 5 ? this.INPUT_CORRECT
          : this.INPUT_WRONG
    })
  }

  updateButtonStyle () {
    const s = this.state
    return ((s.emailStatus === this.INPUT_CORRECT) &&
      (s.passStatus === this.INPUT_CORRECT))
      ? 'button-ready' : 'button-pending'
  }

  handleSubmit (event) {
    event.preventDefault()
    console.log(JSON.stringify(this.state))
  }
}

export default Login
