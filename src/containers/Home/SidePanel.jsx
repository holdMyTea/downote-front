import React from 'react'
import { Menu, Sidebar, Button } from 'semantic-ui-react'
import Types from 'prop-types'

const SidePanel = ({ visible, onLogOutClick }) => (
  <Sidebar
    as={Menu}
    animation='uncover'
    inverted
    vertical
    visible={visible}
    width='thin'
  >
    <Menu.Item>
      <Button onClick={onLogOutClick}>
        Log Out
      </Button>
    </Menu.Item>
  </Sidebar>
)

SidePanel.propTypes = {
  children: Types.node
}

export default SidePanel
