import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useDrop } from 'react-dnd'
import Types from 'prop-types'

const NotesColumn = ({ columnIndex, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'Note',
    drop: (item, monitor) => console.log(item.id)
  })

  return (
    <Grid.Column>
      <div ref={drop}>
        { children }
      </div>
    </Grid.Column>
  )
}

export default NotesColumn
