import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from './Login/Login'

class App extends React.Component {
  render () {
    return (
      <Router>
        <>
          <Route path='/end' component={() => (<h3>Nope</h3>)} />
          <Route path='/' exact component={Login} />
        </>
      </Router>
    )
  }
}

export default App
