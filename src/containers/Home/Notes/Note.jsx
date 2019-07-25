import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import { useDrag } from 'react-dnd'
import Types from 'prop-types'

const defaultPic = process.env.PUBLIC_URL + 'images/defaultPic.png'

const styles = (isDragging) => ({
  backgroundColor: 'lightyellow',
  padding: '10px',
  border: '1px solid silver',
  borderRadius: 3,
  margin: '1rem',
  opacity: isDragging ? 0 : 1
})

const Note = ({ id, header, text, image }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'Note', id },
    collect: monitor => ({ isDragging: !!monitor.isDragging() })
  })

  return (
    <div style={styles(isDragging)} ref={drag}>
      { header && (<Header as='h3'>{ header }</Header>) }

      { text && (<p>{ text }</p>) }

      { image && (<Image src={defaultPic} />)}
    </div>
  )
}

Note.propTypes = {
  id: Types.string.isRequired,
  header: Types.string,
  text: Types.string,
  image: Types.bool
}

export default Note