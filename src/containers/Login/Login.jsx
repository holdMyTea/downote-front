import React, { Component } from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'

import LoginForm from './LoginForm/LoginForm'
import { tryLoggingIn } from '../../actions/loginActions'
import './Login.scss'

class Login extends Component {
  render () {
    return (
      <div className='login-container'>
        <div className='login-box'>
          <h3 className='login-header'>DowNote</h3>
          {
            this.props.isLoginPending
              ? <h6>Woopsi-Doopsie</h6>
              : <LoginForm email={this.props.email}
                onLogin={this.props.onFormSubmit}/>
          }
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  email: Types.string,
  isLoginPending: Types.bool.isRequired,
  error: Types.string,
  onFormSubmit: Types.func.isRequired
}

const mapStateToProps = state => ({
  email: state.login.email,
  isLoginPending: state.login.isLoginPending,
  error: state.login.error
})

const mapDispatchToProps = dispatch => ({
  onFormSubmit: (email, pass) => dispatch(tryLoggingIn(email, pass))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
