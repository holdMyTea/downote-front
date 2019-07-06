import React from 'react'

import NotesColumns from './NotesColumns/NotesColumns'

import './NotesWrapper.scss'

const NotesWrapper = () => {
  const mapNotes = (columnsCount = 3) => {
    return new Array(columnsCount).fill(0).map(
      (i, index) => (<NotesColumns key={index} notes={['Kappa', 'Keepo', 'Kippa']}/>)
    )
  }

  return (
    <div className='notes-wrapper'>
      { mapNotes(4) }
      <button className='add-note-button'>+</button>
    </div>
  )
}

export default NotesWrapper
