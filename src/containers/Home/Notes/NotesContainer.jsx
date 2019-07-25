import React from 'react'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'
import Types from 'prop-types'

import Note from './Note'

const styles = {
  notesGrid: {
    backgroundColor: 'snow',
    height: '100%',
    padding: '20px'
  }
}

const NotesContainer = ({ notes, columns = 3 }) => {
  const fillColumn = (columnIndex) =>
    notes.filter((note, index) => index % columns === columnIndex)
      .map(note => (
        <Note
          id={note.id}
          header={note.header}
          text={note.text}
          image={note.image}
          key={note.id}
        />
      ))

  return (
    <Grid padded columns={columns} style={styles.notesGrid}>
      {
        Array(columns).fill(0).map((column, index) => (
          <Grid.Column key={index}>
            { fillColumn(index) }
          </Grid.Column>
        ))
      }
    </Grid>
  )
}

NotesContainer.propTypes = {
  notes: Types.arrayOf(
    Types.shape({
      id: Types.string.isRequired,
      header: Types.string,
      text: Types.string,
      image: Types.bool,
      order: Types.number.isRequired
    })
  ).isRequired
}

const mapStateToProps = state => ({
  notes: state.home.notes
})

export default connect(
  mapStateToProps
)(NotesContainer)
