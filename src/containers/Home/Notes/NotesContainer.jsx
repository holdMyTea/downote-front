import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Grid, Button } from 'semantic-ui-react'
import Types from 'prop-types'

import {
  moveNoteOverColumn,
  moveNoteOverNote,
  createNote,
  editNote,
  deleteNote
} from '../../../actions/notesActions'
import NotesColumn from './NotesColumn'
import AddNoteModal from './AddNoteModal'

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
 * @param {function} props.onCreateNote - Function to be called when a new note is created
 * @param {function} props.onEditNote - Function to be called when an existing note is edited
 * @param {function} props.onDeleteNote - Function to be called when an existing note is deleted
 */
const NotesContainer = ({ columns, onColumnDrop, onNoteDrop, onCreateNote, onEditNote, onDeleteNote }) => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Grid padded columns={columns.length} style={styles}>
        {
          columns.map((col, index) => (
            <NotesColumn
              key={index}
              notes={col}
              createNoteDragItem={
                noteId => ({ type: 'Note', id: noteId, columnIndex: index })
              }
              onColumnDrop={
                (noteId, oldColumnIndex) => onColumnDrop(noteId, oldColumnIndex, index)
              }
              onNoteDrop={
                (noteId, targetNoteId, oldColumnIndex) => onNoteDrop(noteId, targetNoteId, oldColumnIndex, index)
              }
              onEditNote={
                (noteId, header, text) => onEditNote(noteId, header, text, index)
              }
              onDeleteNote={
                noteId => onDeleteNote(noteId, index)
              }
            />
          ))
        }
      </Grid>

      <Button icon='add circle'
        onClick={() => setModalOpen(true)}
        style={{ position: 'fixed', bottom: 15, right: 15 }}
      />

      <AddNoteModal
        open={modalOpen}
        onSave={onCreateNote}
        onClose={() => setModalOpen(false)}
      />
    </>
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
  onNoteDrop: Types.func.isRequired,
  onCreateNote: Types.func.isRequired,
  onEditNote: Types.func.isRequired,
  onDeleteNote: Types.func.isRequired
}

const mapStateToProps = state => ({
  columns: state.home.columns
})

const mapDispatchToProps = dispatch => ({
  onColumnDrop: (noteId, oldColumnIndex, newColumnIndex) =>
    dispatch(moveNoteOverColumn(noteId, oldColumnIndex, newColumnIndex)),

  onNoteDrop: (noteId, targetNoteId, oldColumnIndex, newColumnIndex) =>
    dispatch(moveNoteOverNote(noteId, targetNoteId, oldColumnIndex, newColumnIndex)),

  onCreateNote: (header, text) => dispatch(createNote(header, text)),
  onEditNote: (noteId, header, text, columnIndex) => dispatch(editNote(noteId, header, text, columnIndex)),
  onDeleteNote: (noteId, columnIndex) => dispatch(deleteNote(noteId, columnIndex))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesContainer)
