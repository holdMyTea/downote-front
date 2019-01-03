import React, { Component } from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'

import Notification from '../../components/Notification/Notification/Notification'
import './NotificationContainer.scss'

class NotificationContainer extends Component {
  render () {
    return (
      <div className='notification-container'>
        {
          this.props.queue.map(e =>
            (<Notification key={e.id}
              header={e.header} text={e.text} type={e.type} />)
          )
        }
      </div>
    )
  }
}

NotificationContainer.propTypes = {
  queue: Types.arrayOf(
    Types.shape({
      id: Types.number.isRequired,
      header: Types.string.isRequired,
      text: Types.string.isRequired,
      type: Types.string.isRequired
    })
  )
}

const mapStateToProps = state => ({
  queue: state.notifications.queue
})

export default connect(
  mapStateToProps
)(NotificationContainer)
