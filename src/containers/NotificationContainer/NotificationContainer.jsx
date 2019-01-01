import React, { Component } from 'react'

import './NotificationContainer.scss'

class NotificationContainer extends Component {
  render () {
    return (
      <div className='notification-container'>
        <div className='notification'>
          <h4>Login failed</h4>
          <p>Could not reach the server, please, check your connection</p>
        </div>
      </div>
    )
  }
}

export default NotificationContainer
