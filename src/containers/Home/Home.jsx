import React, { Component } from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'
import { Redirect } from 'react-router-dom'

import { logOut } from '../../actions/loginActions'

class Home extends Component {
  render () {
    if (!this.props.token)
      return (<Redirect to='/login' />)

    return (
      <div>
        <h1>Home</h1>
        <button onClick={this.props.onLogOutClick}>Log Out</button>
      </div>
    )
  }
}

Home.propTypes = {
  token: Types.string,
  onLogOutClick: Types.func.isRequired
}

const mapStateToProps = state => ({
  token: state.login.token
})

const mapDispatchToProps = dispatch => ({
  onLogOutClick: () => dispatch(logOut())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
