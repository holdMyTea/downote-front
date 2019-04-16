import React, { Component } from 'react'
import Types from 'prop-types'

import './TopBar.scss'

class TopBar extends Component {
  render () {
    return (
      <div className="topbar">
        { this.props.children }
      </div>
    )
  }
}

TopBar.propTypes = {
  children: Types.node
}

export default TopBar
