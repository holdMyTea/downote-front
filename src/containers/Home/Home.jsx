import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Icon, Sidebar } from 'semantic-ui-react'
import Types from 'prop-types'
import { Redirect } from 'react-router-dom'

import SidePanel from './SidePanel'
import Notes from './Notes/NotesContainer'
import { logOut } from '../../actions/loginActions'

const styles = {
  menuIconStyles: {
    position: 'absolute',
    top: '1em',
    left: '1em'
  }
}

const Home = ({ token, onLogOutClick }) => {
  const [sidePanleVisibility, setSidePanelVisibility] = useState(false)

  if (!token) { return (<Redirect to='/login' />) }

  return (
    <Sidebar.Pushable style={{ height: '100%' }}>
      <SidePanel visible={sidePanleVisibility} onLogOutClick={onLogOutClick} />

      <Sidebar.Pusher>
        <Icon style={styles.menuIconStyles} name='bars' onClick={() => setSidePanelVisibility(!sidePanleVisibility)}/>

        <Notes />
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
