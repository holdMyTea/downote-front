import React, { useState } from 'react'
import Types from 'prop-types'
import { Form } from 'semantic-ui-react'

/**
 * Component with two inputs, email and password, and submit button
 * @param {string} [email=''] value to pre-fill email input with
 * @param {function} onSubmit submit function will be called with email string as the first param and password as the second one
 */
const LoginForm = ({ email = '', onSubmit }) => {
  // stores the current email input value
  const [ emailInput, setEmailInput ] = useState(email)
  // used for applying styles to email input and submit button
  const [ isEmailValid, setEmailValid ] = useState(true)

  // stores the current pass input value
  const [ passInput, setPassInput ] = useState('')
  // used for applying styles to pass input and submit button
  const [ isPassValid, setPassValid ] = useState(true)

  // validates email input
  const onEmailChange = (event) => {
    const newInput = event.target.value
    setEmailInput(newInput)
    setEmailValid(newInput.length === 0 ||
      /(\w)+@(\w)+\.{1}\w{1,5}/.test(newInput))
  }

  // validates pass input
  const onPassChange = (event) => {
    const newInput = event.target.value
    setPassInput(newInput)
    setPassValid(
      newInput.length === 0 || newInput.length > 5
    )
  }

  // checking for inputs' validity and lentgth to disable the submit button
  const isButtonDisabled = !(isEmailValid && isPassValid) ||
      emailInput.length === 0 || passInput.length === 0

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(emailInput, passInput)
  }

  return (
    <Form>
      <Form.Input
        label='Email'
        type='email'
        placeholder='Email'
        error={!isEmailValid}
        onChange={onEmailChange} />

      <Form.Input
        label='Password'
        type='password'
        placeholder='Password'
        error={!isPassValid}
        onChange={onPassChange} />

      <Form.Button
        fluid
        onClick={handleSubmit}
        disabled={isButtonDisabled}
        positive={!isButtonDisabled}
      >
        Log In
      </Form.Button>
    </Form>
  )
}

LoginForm.propTypes = {
  email: Types.string,
  onSubmit: Types.func.isRequired
}

export default LoginForm
