import React, { Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import { Dimmer, Loader } from 'semantic-ui-react'

import NotificationContainer from './NotificationContainer/NotificationContainer'

const Login = lazy(() => import(
  /* webpackChunkName: "Login" */
  './Login/Login'
))
const Home = lazy(() => import(
  /* webpackChunkName: "Home" */
  './Home/Home'
))

const App = ({ token }) => (
  <Suspense fallback={(
    <Dimmer active={true} page>
      <Loader />
    </Dimmer>
  )}>
    <Switch>
      <Route path='/login' exact component={Login} />
      <Route path='/home' exact component={Home} />

      {/* Redirecting to home/login from the root route */}
      <Route path='/' exact component={() => <Redirect to={token ? '/home' : '/login'} />} />

      {/* No match route */}
      <Route component={() => (<h1>ЧОЧ</h1>)} />
    </Switch>

    <NotificationContainer />
  </Suspense>
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
