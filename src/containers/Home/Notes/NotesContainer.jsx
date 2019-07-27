import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import Types from 'prop-types'

import { moveNoteOverColumn, moveNoteOverNote } from '../../../actions/notesActions'
import NotesColumn from './NotesColumn'

const styles = {
  backgroundColor: 'snow',
  height: '100%'
}

const NotesContainer = ({ columns, onColumnDrop, onNoteDrop }) => {
  return (
    <Grid padded columns={columns.length} style={styles}>
      {
        columns.map((col, index) => (
          <NotesColumn notes={col} columnIndex={index}
            key={index}
            onColumnDrop={
              (noteId, oldColumnIndex) => onColumnDrop(noteId, oldColumnIndex, index)
            }
            onNoteDrop={
              (noteId, targetNoteId, oldColumnIndex) => onNoteDrop(noteId, targetNoteId, oldColumnIndex, index)
            }/>
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
  ).isRequired,
  onColumnDrop: Types.func.isRequired,
  onNoteDrop: Types.func.isRequired
}

const mapStateToProps = state => ({
  columns: state.home.columns
})

const mapDispatchToProps = dispatch => ({
  onColumnDrop: (noteId, oldColumnIndex, newColumnIndex) =>
    dispatch(moveNoteOverColumn(noteId, oldColumnIndex, newColumnIndex)),

  onNoteDrop: (noteId, targetNoteId, oldColumnIndex, newColumnIndex) =>
    dispatch(moveNoteOverNote(noteId, targetNoteId, oldColumnIndex, newColumnIndex))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesContainer)
