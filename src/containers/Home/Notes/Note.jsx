import React from 'react'
import { Container, Header, Image } from 'semantic-ui-react'
import Types from 'prop-types'

const defaultPic = process.env.PUBLIC_URL + 'images/defaultPic.png'

const styles = {
  noteContainer: {
    backgroundColor: 'lightyellow',
    padding: '10px',
    border: '1px solid silver',
    borderRadius: 3,
    margin: '1rem'
  }
}

const Note = ({ header, text, image }) => (
  <Container style={styles.noteContainer}>
    { header && (<Header as='h3'>{ header }</Header>) }

    { text && (<p>{ text }</p>) }

    { image && (<Image src={defaultPic} />)}
  </Container>
)

Note.propTypes = {
  header: Types.string,
  text: Types.string,
  image: Types.bool
}

export default Note
