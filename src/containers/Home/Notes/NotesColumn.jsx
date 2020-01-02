import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useDrop } from 'react-dnd'
import Types from 'prop-types'

import Note from './Note'
import { columnType } from './noteTypes'

/**
 * A Grid.Column for Notes, also handles Notes drops
 * @param {Object} props
 * @param {Object[]} props.notes - notes to be rendered within column
 * @param {function} props.createNoteDragItem - function to generate drag items for Notes
 * @param {function} props.onColumnDrop - function called when a Note is dropped on a column
 * @param {function} props.onNoteDrop - function passed to Notes to handle drop
 * @param {function} props.onEditNote - function passed to Notes to handle edit
 * @param {function} props.onDeleteNote - function passed to Notes to handle deletion
 */
const NotesColumn = ({ notes, createNoteDragItem, onColumnDrop, onNoteDrop, onEditNote, onDeleteNote }) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: 'Note',
    // not calling drop on column, if the drag is dropped on child (another note)
    drop: (item) => isOverCurrent ? onColumnDrop(item.id, item.columnIndex) : null,
    // allowing drop if the column is empty or the Note is not the last in this column
    canDrop: (item) => notes.length === 0 || item.id !== notes[notes.length - 1].id,
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  })

  return (
    <Grid.Column style={{ padding: 0 }}>
      <div ref={drop}
        data-testid={`note-col`}
        style={{
          height: '100%',
          padding: '30px',
          backgroundColor: isOver ? 'gainsboro' : 'inherit',
          transition: '500ms'
        }}>
        {
          notes.map((note, index) => (
            <Note key={note.id}
              header={note.header}
              text={note.text}
              image={note.image}
              dragItem={createNoteDragItem(note.id)}
              onNoteDrop={(item) => onNoteDrop(item.id, note.id, item.columnIndex)}
              onCanDrop={
                // blocking the drop of the note onto the following note (in the same column)
                index > 0
                  ? (item) => item.id !== note.id && item.id !== notes[index - 1].id
                  : (item) => item.id !== note.id
              }
              onEdit={(header, text) => onEditNote(note.id, header, text)}
              onDelete={() => onDeleteNote(note.id)}
            />
          ))
        }
      </div>
    </Grid.Column>
  )
}

NotesColumn.propTypes = {
  notes: columnType,
  createNoteDragItem: Types.func.isRequired,
  onColumnDrop: Types.func.isRequired,
  onNoteDrop: Types.func.isRequired,
  onEditNote: Types.func.isRequired,
  onDeleteNote: Types.func.isRequired
}

export default NotesColumn
