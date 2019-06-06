import React, { useState } from 'react'
import Types from 'prop-types'

import './LoginForm.scss'

const INPUT_REQUIRED = 'input-required'
const INPUT_CORRECT = 'input-correct'
const INPUT_WRONG = 'input-wrong'

const LoginForm = ({ email, onLogin }) => {
  const [ emailInput, setEmailInput ] = useState(email)
  const [ emailStatus, setEmailStatus ] = useState(INPUT_REQUIRED)

  const [ passInput, setPassInput ] = useState('')
  const [ passStatus, setPassStatus ] = useState(INPUT_REQUIRED)

  const onEmailChange = (event) => {
    const newInput = event.target.value
    setEmailInput(newInput)
    setEmailStatus(
      newInput.length === 0 ? INPUT_REQUIRED
        : /(\w)+@(\w)+\.{1}\w{1,5}/.test(newInput) ? INPUT_CORRECT
          : INPUT_WRONG
    )
  }

  const onPassChange = (event) => {
    const newInput = event.target.value
    setPassInput(newInput)
    setPassStatus(
      newInput.length === 0 ? INPUT_REQUIRED
        : newInput.length > 5 ? INPUT_CORRECT
          : INPUT_WRONG
    )
  }

  const updateButtonStyle = () => {
    return ((emailStatus === INPUT_CORRECT) && (passStatus === INPUT_CORRECT))
      ? 'button-ready' : 'button-pending'
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(
      emailInput,
      passInput
    )
  }

  return (
    <form className='login-form'>

      <div className='login-form-group'>
        <label className='login-label'>
          Email:
        </label>
        <input className={`login-input ${emailStatus}`}
          type='email' value={emailInput}
          onChange={onEmailChange} placeholder={'Email'} />
      </div>

      <div className='login-form-group'>
        <label className='login-label'>
          Password:
        </label>
        <input className={`login-input ${passStatus}`}
          type='password' value={passInput}
          onChange={onPassChange} placeholder={'Password'} />
      </div>

      <button className={`login-button ${updateButtonStyle()}`}
        onClick={handleSubmit}>
        Log In
      </button>

    </form>
  )
}

LoginForm.propTypes = {
  email: Types.string,
  onLogin: Types.func.isRequired
}

export default LoginForm
