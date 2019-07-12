import React from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'

import Login from '../Login/Login'
import Home from '../Home/Home'
import NotificationContainer from '../NotificationContainer/NotificationContainer'

const App = ({ token }) => (
  <>
    <Switch>
      <Route path='/login' exact component={Login} />
      <Route path='/home' exact component={Home} />

      {/* Redirecting to home/login from the root route */}
      <Route path='/' exact component={() => <Redirect to={token ? '/home' : '/login'} />} />

      {/* No match route */}
      <Route component={() => (<h1>ЧОЧ</h1>)} />
    </Switch>

    <NotificationContainer />
  </>
)

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
