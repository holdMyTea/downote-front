import React, { Component } from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'
import { Redirect } from 'react-router-dom'

import TopBar from './TopBar/TopBar'
import { logOut } from '../../actions/loginActions'

class Home extends Component {
  render () {
    if (!this.props.token)
      return (<Redirect to='/login' />)

    return (
      <div>
        <TopBar>
          <button
            onClick={this.props.onLogOutClick}
            className='topbar-logout'
          >Log Out</button>
        </TopBar>
        <h1>Home</h1>
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
