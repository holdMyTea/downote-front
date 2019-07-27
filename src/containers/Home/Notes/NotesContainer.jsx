import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import Types from 'prop-types'

import { moveNote } from '../../../actions/notesActions'
import NotesColumn from './NotesColumn'

const styles = {
  backgroundColor: 'snow',
  height: '100%'
}

const NotesContainer = ({ columns, moveNote }) => {
  return (
    <Grid padded columns={columns.length} style={styles}>
      {
        columns.map((col, index) => (
          <NotesColumn notes={col} columnIndex={index}
            key={index}
            moveNote={moveNote} />
        ))
      }
    </Grid>
  )
}

NotesContainer.propTypes = {
  columns: Types.arrayOf(
    Types.arrayOf(
      Types.shape({
        id: Types.string.isRequired,
        header: Types.string,
        text: Types.string,
        image: Types.bool,
        order: Types.number.isRequired
      }))
  ).isRequired
}

const mapStateToProps = state => ({
  columns: state.home.columns
})

const mapDispatchToProps = dispatch => ({
  moveNote: (noteId, oldColumnIndex, newColumnIndex) =>
    dispatch(moveNote(noteId, oldColumnIndex, newColumnIndex))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesContainer)
