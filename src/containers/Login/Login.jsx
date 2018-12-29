import React, { Component } from 'react'

import LoginForm from '../../components/Login/LoginForm/LoginForm'
import './Login.scss'

class Login extends Component {
  render () {
    return (
      <div className='login-container'>
        <div className='login-box'>
          <h3 className='login-header'>DowNote</h3>

          <LoginForm />

        </div>
      </div>
    )
  }
}

export default Login
