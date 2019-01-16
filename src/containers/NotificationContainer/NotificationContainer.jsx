import React, { Component } from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'
import { Transition } from 'react-spring'

import Notification from './Notification/Notification'
import './NotificationContainer.scss'

class NotificationContainer extends Component {
  render () {
    return (
      <div className='notification-container'>
        { this.buildList() }
      </div>
    )
  }

  buildList = () => (
    <Transition
      items={this.props.queue}
      keys={item => item.id}
      from={{ opacity: 0.01, transform: 'translate(0px, 70px)' }}
      enter={{ opacity: 1, transform: 'translate(0px, 0px)' }}
      leave={{ opacity: 0.01, transform: 'translate(-100px, 0px)' }} >
      { item => props => (
        <Notification header={item.header} description={item.description} type={item.type} style={props} />
      )}
    </Transition>
  )
}

NotificationContainer.propTypes = {
  queue: Types.arrayOf(
    Types.shape({
      id: Types.number.isRequired,
      header: Types.string.isRequired,
      description: Types.string,
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
