import React from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'
import { useTransition } from 'react-spring'

import Notification from './Notification/Notification'
import './NotificationContainer.scss'

const NotificationContainer = ({ queue }) => {
  const transitions = useTransition(
    queue,
    queue => queue.key,
    {
      from: { opacity: 0.01, transform: 'translate(0px, 70px)' },
      enter: { opacity: 1, transform: 'translate(0px, 0px)' },
      leave: { opacity: 0.01, transform: 'translate(-100px, 0px)' }
    }
  )

  return (
    <div className='notification-container'>
      {
        transitions.map(
          ({ item, key, props }) =>
            (<Notification key={key} header={item.header} description={item.description} type={item.type} style={props} />)
          )
      }
    </div>
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
