import React from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'
import { Redirect } from 'react-router-dom'
import { Grid, Header } from 'semantic-ui-react'

import LoginForm from './LoginForm'
import { logIn } from '../../actions/loginActions'

const backgroundStyles = {
  width: '100%',
  height: '100%',
  margin: 0,
  backgroundImage: 'url("https://i.pinimg.com/originals/ed/1e/2d/ed1e2df6ff8f27e50724b091ccba4645.jpg")',
  backgroundRepeat: 'no-repeat',
  backgroundColor: 'darkgray',
  backgroundBlendMode: 'screen'
}

const Login = ({ token, email, isLoginPending, error, onFormSubmit }) => {
  if (token) { return (<Redirect to='/home' />) }

  return (
    <Grid verticalAlign='middle' style={backgroundStyles}>
      <Grid.Column style={{ maxWidth: 400, margin: 'auto' }}>
        <Header textAlign='center'>
          DowNote
        </Header>
        {
          isLoginPending
            ? <h6>Woopsi-Doopsie</h6>
            : <LoginForm email={email} onSubmit={onFormSubmit} />
        }
      </Grid.Column>
    </Grid>
  )
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
