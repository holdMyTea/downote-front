import React, { Component } from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'
import { Redirect } from 'react-router-dom'

import LoginForm from './LoginForm/LoginForm'
import { logIn } from '../../actions/loginActions'
import './Login.scss'

class Login extends Component {
  render () {
    if (this.props.token)
      return (<Redirect to='/home' />)

    return (
      <div className='login-container'>
        <div className='login-box'>
          <h3 className='login-header'>DowNote</h3>
          {
            this.props.isLoginPending
              ? <h6>Woopsi-Doopsie</h6>
              : <LoginForm email={this.props.email}
                onLogin={this.props.onFormSubmit} />
          }
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  token: Types.string,
  email: Types.string,
  isLoginPending: Types.bool.isRequired,
  error: Types.string,
  onFormSubmit: Types.func.isRequired
}

const mapStateToProps = state => ({
  token: state.login.token,
  email: state.login.email,
  isLoginPending: state.login.isLoginPending,
  error: state.login.error
})

const mapDispatchToProps = dispatch => ({
  onFormSubmit: (email, pass) => dispatch(logIn(email, pass))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
