import React from 'react'
import { Grid } from 'semantic-ui-react'

import Note from './Note'

const Notes = () => (
  <Grid padded columns={3} style={{ backgroundColor: 'snow' }}>
    <Grid.Column>
      <Note/>
    </Grid.Column>
    <Grid.Column>
      <Note/>
    </Grid.Column>
    <Grid.Column>
      <Note/>
    </Grid.Column>
  </Grid>
)

export default Notes
