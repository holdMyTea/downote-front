import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useDrop } from 'react-dnd'
import Types from 'prop-types'

import Note from './Note'

const NotesColumn = ({ notes, columnIndex }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'Note',
    drop: (item, monitor) => console.log(item.id)
  })

  return (
    <Grid.Column>
      <div ref={drop}>
        {
          notes.map(note => (
            <Note id={note.id} key={note.id}
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
  columnIndex: Types.number,
  children: Types.node
}

export default NotesColumn
