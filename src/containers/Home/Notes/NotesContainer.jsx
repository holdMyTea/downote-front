import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import Types from 'prop-types'

import { moveNoteOverColumn, moveNoteOverNote } from '../../../actions/notesActions'
import NotesColumn from './NotesColumn'

const styles = {
  backgroundColor: 'snow',
  height: '100%',
  overflowY: 'auto'
}

/**
 * The root notes component, a Grid container for NotesColumns
 * @param {Object[][]} props.columns - Array of arrays of notes
 * @param {function} props.onColumnDrop - Function to be called when note is dropped on column
 * @param {function} props.onNoteDrop - Function to be called when note is dropped on another note
 */
const NotesContainer = ({ columns, onColumnDrop, onNoteDrop }) => {
  return (
    <Grid padded columns={columns.length} style={styles}>
      {
        columns.map((col, index) => (
          <NotesColumn
            key={index}
            notes={col}
            createNoteDragItem={
              (noteId) => ({ type: 'Note', id: noteId, columnIndex: index })
            }
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
