import React from 'react'
import Types from 'prop-types'

const Notification = ({ header, text, type }) => (
  <div className={`notification ${type}`}>
    <h4>{header}</h4>
    <p>{text}</p>
  </div>
)

Notification.propTypes = {
  header: Types.string.isRequired,
  text: Types.string.isRequired,
  type: Types.string.isRequired
}

export default Notification
