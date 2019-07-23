import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Icon, Sidebar, Segment } from 'semantic-ui-react'
import Types from 'prop-types'
import { Redirect } from 'react-router-dom'

import SidePanel from './SidePanel'
import Notes from './NotesContainer/NotesContainer'
import { logOut } from '../../actions/loginActions'

const styles = {
  homeSegment: {
    width: '100%',
    height: '100%'
  },
  menuIconStyles: {
    position: 'relative',
    top: 3,
    bottom: 3
  }
}

const Home = ({ token, onLogOutClick }) => {
  const [sidePanleVisibility, setSidePanelVisibility] = useState(false)

  if (!token) { return (<Redirect to='/login' />) }

  return (
    <Sidebar.Pushable>
      <SidePanel visible={sidePanleVisibility}>
        <Button onClick={onLogOutClick}>
            Log Out
        </Button>
      </SidePanel>

      <Sidebar.Pusher>
        <Segment style={styles.homeSegment}>
          <Icon style={styles.menuIconStyles} name='bars' onClick={() => setSidePanelVisibility(!sidePanleVisibility)}/>

          <Notes />
        </Segment>
      </Sidebar.Pusher>

    </Sidebar.Pushable>
  )
}

Home.propTypes = {
  token: Types.string,
  onLogOutClick: Types.func.isRequired
}

const mapStateToProps = state => ({
  token: state.login.token
})

const mapDispatchToProps = dispatch => ({
  onLogOutClick: () => dispatch(logOut())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
