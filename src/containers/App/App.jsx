import React, { Component } from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'

import Login from '../Login/Login'
import NotificationContainer from '../NotificationContainer/NotificationContainer'

import './App.scss'

class App extends Component {
  render () {
    return (
      <>
        <Switch>
          <Route path='/login' exact component={Login} />
          <Route path='/home' exact component={() => (<h1>Home</h1>)} />

          <Route path='/' component={
            this.props.token
              ? () => <Redirect to='/home' />
              : () => <Redirect to='/login' />
          } />
        </Switch>

        <NotificationContainer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  token: state.login.token
})

App.propTypes = {
  token: Types.string
}

export default withRouter(
  connect(
    mapStateToProps
  )(App)
)
