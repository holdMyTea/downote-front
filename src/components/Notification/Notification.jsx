import React from 'react'
import Types from 'prop-types'

const Notification = ({ header, description, type }) => (
  <div className={`notification ${type}`}>
    <h4>{header}</h4>
    {
      description ? (<p>{description}</p>) : null
    }
  </div>
)

Notification.propTypes = {
  header: Types.string.isRequired,
  description: Types.string,
  type: Types.string.isRequired
}

export default Notification
