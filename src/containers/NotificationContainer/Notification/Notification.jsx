import React from 'react'
import Types from 'prop-types'
import { animated } from 'react-spring'

const Notification = ({ header, description, type, style }) => (
  <animated.div className={`notification ${type}`} style={style}>
    <h4>{header}</h4>
    {
      description ? (<p>{description}</p>) : null
    }
  </animated.div>
)

Notification.propTypes = {
  header: Types.string.isRequired,
  description: Types.string,
  type: Types.string.isRequired,
  style: Types.object
}

export default Notification
