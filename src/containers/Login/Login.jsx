import React, { Component } from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'

import LoginForm from '../../components/Login/LoginForm/LoginForm'
import { tryLoggingIn } from '../../actions/actionsLogin'
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
              : <LoginForm onLogin={this.props.onFormSubmit}/>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoginPending: state.login.isLoginPending,
    error: state.login.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFormSubmit: (email, pass) => dispatch(tryLoggingIn(email, pass))
  }
}

Login.propTypes = {
  isLoginPending: Types.bool.isRequired,
  error: Types.string,
  onFormSubmit: Types.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
