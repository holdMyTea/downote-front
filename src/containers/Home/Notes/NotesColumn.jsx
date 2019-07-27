import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useDrop } from 'react-dnd'
import Types from 'prop-types'

import Note from './Note'

const NotesColumn = ({ notes, columnIndex, onColumnDrop, onNoteDrop }) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop({
    accept: 'Note',
    drop: (item) => {
      if (!isOverCurrent) {
        return
      }
      onColumnDrop(item.id, item.columnIndex)
    },
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
        backgroundColor: isOver
          ? 'gainsboro'
          : 'inherit'
      }}>
        {
          notes.map(note => (
            <Note id={note.id} key={note.id}
              columnIndex={columnIndex}
              header={note.header}
              text={note.text}
              image={note.image}
              onNoteDrop={onNoteDrop}
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
  columnIndex: Types.number.isRequired,
  onColumnDrop: Types.func.isRequired,
  onNoteDrop: Types.func.isRequired
}

export default NotesColumn
