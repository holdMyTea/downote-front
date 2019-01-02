import React from 'react'

const Notification = (header, text, type) => (
  <div className={`notification ${type}`}>
    <h4>{header}</h4>
    <p>{text}</p>
  </div>
)

export default Notification
