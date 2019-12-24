import React from 'react'
import { connect } from 'react-redux'
import Types from 'prop-types'
import { Transition, List, Message } from 'semantic-ui-react'

import { NOTIFICATION_TYPE_ERROR, NOTIFICATION_TYPE_SUCCESS } from '../../actions/notificationActions'

const containerStyle = {
  position: 'fixed',
  width: 150,
  top: 0,
  left: 0,
  margin: 30,
  zIndex: 10001 // loading dimmer has it set to 1000
}

const NotificationContainer = ({ queue }) => (
  <Transition.Group as={List} duration={300} style={containerStyle}>
    { queue.map((item) =>
      (<Message key={item.id}
        positive={item.type === NOTIFICATION_TYPE_SUCCESS}
        negative={item.type === NOTIFICATION_TYPE_ERROR}>
        {item.header}
      </Message>)
    )}
  </Transition.Group>
)

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
