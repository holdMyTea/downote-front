import React from 'react'
import { Menu, Sidebar } from 'semantic-ui-react'
import Types from 'prop-types'

const SidePanel = ({ visible, children }) => (
  <Sidebar
    as={Menu}
    animation='uncover'
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
    { children }
  </Sidebar>
)

SidePanel.propTypes = {
  children: Types.node
}

export default SidePanel
