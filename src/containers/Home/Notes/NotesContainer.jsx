import React from 'react'
import { Grid } from 'semantic-ui-react'

import Note from './Note'

const styles = {
  notesGrid: {
    backgroundColor: 'snow',
    height: '100%',
    padding: '20px'
  }
}

const makePlaceholder = i => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(i)

const Notes = () => (
  <Grid padded columns={3} style={styles.notesGrid}>

    <Grid.Column>
      <Note
        header='A paragraph long note'
        text={makePlaceholder(5)}
      />
      <Note
        text='No header here, but still should be rendered ok'
      />
    </Grid.Column>

    <Grid.Column>
      <Note
        header='A rather long note'
        text={makePlaceholder(12)}
      />
      <Note
        header='Just a header here, must be smth short but important'
      />
    </Grid.Column>

    <Grid.Column>
      <Note
        header='A short note but with a pic'
        text={makePlaceholder(2)}
        image/>
    </Grid.Column>

  </Grid>
)

export default Notes
