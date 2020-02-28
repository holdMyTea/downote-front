import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Icon, Sidebar, Dimmer, Loader } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Types from 'prop-types'

import SidePanel from './SidePanel'
import Notes from './Notes/NotesContainer'
import { logOut } from '../../actions/loginActions'
import { fetchNotes } from '../../actions/notesActions'

const styles = {
  menuIconStyles: {
    position: 'absolute',
    top: '1em',
    left: '1em',
    zIndex: 10
  }
}

const Home = ({ token, isLoading, fetchNotes, onLogOutClick }) => {
  const [sidePanleVisibility, setSidePanelVisibility] = useState(false)

  // redirecting to /login, if no token is in state
  if (!token) { return (<Redirect to='/login' />) }

  // fetching /notes on first render
  useEffect(() => { fetchNotes() }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      {/* transform here's 'cause of https://github.com/Semantic-Org/Semantic-UI-React/issues/2897 */}
      <Sidebar.Pushable style={{ height: '100%', transfrom: 'none' }}>
        <SidePanel visible={sidePanleVisibility} onLogOutClick={onLogOutClick} />

        <Sidebar.Pusher>

          <Dimmer active={isLoading} page>
            <Loader />
          </Dimmer>

          <Icon style={styles.menuIconStyles} name='bars' onClick={() => setSidePanelVisibility(!sidePanleVisibility)}/>

          <Notes />
        </Sidebar.Pusher>

      </Sidebar.Pushable>
    </DndProvider>
  )
}

Home.propTypes = {
  token: Types.string,
  isLoading: Types.bool.isRequired,
  fetchNotes: Types.func.isRequired,
  onLogOutClick: Types.func.isRequired
}

const mapStateToProps = state => ({
  token: state.login.token,
  isLoading: state.login.isLoginPending || state.notes.isLoading
})

const mapDispatchToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchNotes()),
  onLogOutClick: () => dispatch(logOut())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
