import React from 'react'
import Types from 'prop-types'

const NotesColumns = ({ notes }) => (
  <div className='notes-column'>
    {
      notes.map(note => (
        <div key={note} className='note'>
          <p>{note}</p>
        </div>
      ))
    }
  </div>
)

NotesColumns.propTypes = {
  notes: Types.arrayOf(
    Types.string
  )
}

export default NotesColumns
