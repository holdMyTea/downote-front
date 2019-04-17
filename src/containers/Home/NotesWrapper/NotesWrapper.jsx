import React, { Component } from 'react'

import NotesColumns from './NotesColumns/NotesColumns'

import './NotesWrapper.scss'

class NotesWrapper extends Component {
  render () {
    return (
      <div className='notes-wrapper'>
        { this.mapNotes(4) }
        <button className='add-note-button'>+</button>
      </div>
    )
  }

  mapNotes = (columnsCount = 3) => {
    return new Array(columnsCount).fill(0).map(
      (i, index) => (<NotesColumns key={index} notes={['Kappa', 'Keepo', 'Kippa']}/>)
    )
  }
}

export default NotesWrapper
