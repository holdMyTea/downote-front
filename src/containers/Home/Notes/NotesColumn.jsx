import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useDrop } from 'react-dnd'
import Types from 'prop-types'

import Note from './Note'

const NotesColumn = ({ notes, createNoteDragItem, onColumnDrop, onNoteDrop }) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: 'Note',
    drop: (item) => isOverCurrent ? onColumnDrop(item.id, item.columnIndex) : null,
    canDrop: (item) => notes.length === 0 || item.id !== notes[notes.length - 1].id,
    collect: monitor => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true })
    })
  })

  return (
    <Grid.Column style={{ padding: 0 }}>
      <div ref={drop} style={{
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
                index > 0
                  ? (item) => item.id !== note.id && item.id !== notes[index - 1].id
                  : (item) => item.id !== note.id
              }
            />
          ))
        }
      </div>
    </Grid.Column>
  )
}

NotesColumn.propTypes = {
  notes: Types.arrayOf(
    Types.shape({
      id: Types.string.isRequired,
      header: Types.string,
      text: Types.string,
      image: Types.bool,
      order: Types.number.isRequired
    })),
  createNoteDragItem: Types.func.isRequired,
  onColumnDrop: Types.func.isRequired,
  onNoteDrop: Types.func.isRequired
}

export default NotesColumn
