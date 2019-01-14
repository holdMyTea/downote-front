import React, { Component } from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Notification from './Notification/Notification'
import './NotificationContainer.scss'

class NotificationContainer extends Component {
  render () {
    return (
      <div className='notification-container'>
        <TransitionGroup>
          { this.buildList() }
        </TransitionGroup>
      </div>
    )
  }

  buildList = () => (
    this.props.queue.map(e => (
      <CSSTransition key={e.id} timeout={500} classNames="notification-animation">
        <Notification header={e.header} description={e.description} type={e.type} />
      </CSSTransition>
    ))
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
