import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Login from './Login/Login'

class App extends Component {
  render () {
    return (
      <>
        <Route path='/end' component={() => (<h3>Nope</h3>)} />
        <Route path='/' exact component={Login} />
      </>
    )
  }
}

export default App
