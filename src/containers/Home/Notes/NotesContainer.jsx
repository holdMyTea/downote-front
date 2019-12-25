import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Loader } from 'semantic-ui-react'
import Types from 'prop-types'

import {
  moveNoteOverColumn,
  moveNoteOverNote,
  createNote,
  editNote,
  deleteNote,
  fetchNotes
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
 * @param {Object} props
 * @param {Object[][]} props.columns - array of arrays (one for each column) of notes
 * @param {boolean} props.isSyncing - is API response pending
 * @param {function} props.onColumnDrop - function to be called when note is dropped on column
 * @param {function} props.onNoteDrop - function to be called when note is dropped on another note
 * @param {function} props.onCreateNote - function to be called when a new note is created
 * @param {function} props.onEditNote - function to be called when an existing note is edited
 * @param {function} props.onDeleteNote - function to be called when an existing note is deleted
 */
const NotesContainer = ({ columns, isSyncing, onColumnDrop, onNoteDrop, onCreateNote, onEditNote, onDeleteNote, onFetchNotes }) => {
  const [modalOpen, setModalOpen] = useState(false)

  // TODO: do smth to the warning here
  useEffect(() => { onFetchNotes() }, [])

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
        title='Add note'
      />

      <AddNoteModal
        open={modalOpen}
        onSave={onCreateNote}
        onClose={() => setModalOpen(false)}
      />

      <div style={{
        position: 'absolute',
        top: '1em',
        right: '1em',
        height: '1em',
        width: '1em'
      }}/>
      <Loader size='tiny' active={isSyncing} />
    </>
  )
}

NotesContainer.propTypes = {
  columns: Types.arrayOf(
    Types.arrayOf(
      Types.shape({
        id: Types.oneOfType([ Types.number, Types.string ]).isRequired,
        header: Types.string,
        text: Types.string,
        image: Types.bool,
        order: Types.number.isRequired
      }))
  ).isRequired,
  isSyncing: Types.bool.isRequired,
  onColumnDrop: Types.func.isRequired,
  onNoteDrop: Types.func.isRequired,
  onCreateNote: Types.func.isRequired,
  onEditNote: Types.func.isRequired,
  onDeleteNote: Types.func.isRequired,
  onFetchNotes: Types.func.isRequired
}

const mapStateToProps = state => ({
  columns: state.notes.columns,
  isSyncing: state.notes.syncArray.length > 0
})

const mapDispatchToProps = dispatch => ({
  onColumnDrop: (noteId, oldColumnIndex, newColumnIndex) =>
    dispatch(moveNoteOverColumn(noteId, oldColumnIndex, newColumnIndex)),

  onNoteDrop: (noteId, targetNoteId, oldColumnIndex, newColumnIndex) =>
    dispatch(moveNoteOverNote(noteId, targetNoteId, oldColumnIndex, newColumnIndex)),

  onCreateNote: (header, text) => dispatch(createNote(header, text)),

  onEditNote: (noteId, header, text, columnIndex) =>
    dispatch(editNote(noteId, header, text, columnIndex)),

  onDeleteNote: (noteId, columnIndex) =>
    dispatch(deleteNote(noteId, columnIndex)),

  onFetchNotes: () => dispatch(fetchNotes())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesContainer)
