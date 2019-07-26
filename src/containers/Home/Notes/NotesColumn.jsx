import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useDrop } from 'react-dnd'
import Types from 'prop-types'

import Note from './Note'

const NotesColumn = ({ notes, columnIndex, moveNote }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'Note',
    drop: (item) => moveNote(item.id, item.columnIndex, columnIndex)
  })

  return (
    <Grid.Column>
      <div ref={drop} style={{ height: '100%' }}>
        {
          notes.map(note => (
            <Note id={note.id} key={note.id}
              columnIndex={columnIndex}
              header={note.header}
              text={note.text}
              image={note.image}
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
  moveNote: Types.func.isRequired
}

export default NotesColumn
