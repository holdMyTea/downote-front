import React from 'react'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      emailValue: '',
      passValue: ''
    }

    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPassChange = this.onPassChange.bind(this)
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
              <input className='login-input'
                type='text' value={this.state.emailValue}
                onChange={this.onEmailChange} placeholder={'Email'}/>
            </div>
            <div className='login-form-group'>
              <label className='login-label'>
                Password:
              </label>
              <input className='login-input'
                type='password' value={this.state.passValue}
                onChange={this.onPassChange} placeholder={'Password'}/>
            </div>
            <button className='login-button' onClick={this.handleSubmit}>Log In</button>
          </form>
        </div>
      </div>
    )
  }

  onEmailChange (event) {
    this.setState({
      emailValue: event.target.value
    })
  }

  onPassChange (event) {
    this.setState({
      passValue: event.target.value
    })
  }

  handleSubmit () {
    console.logs(JSON.stringify(this.state))
  }
}

export default Login
