import React from 'react'
import { Header, Image } from 'semantic-ui-react'
import { useDrag, useDrop } from 'react-dnd'
import Types from 'prop-types'

const defaultPic = process.env.PUBLIC_URL + 'images/defaultPic.png'

const styles = {
  backgroundColor: 'lightyellow',
  padding: '10px',
  marginBottom: '20px',
  border: '1px solid silver',
  borderRadius: 3
}

const Note = ({ header, text, image, dragItem, onNoteDrop, onCanDrop }) => {
  const [, drag] = useDrag({
    item: dragItem,
    collect: monitor => ({ isDragging: monitor.isDragging() })
  })

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Note',
    drop: (item) => onNoteDrop(item),
    canDrop: (item) => onCanDrop(item),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  return (
    <div ref={drop} style={{ paddingTop: isOver && canDrop ? '40px' : 0 }}>
      <div style={styles} ref={drag}>
        { header && (<Header as='h3'>{ header }</Header>) }

        { text && (<p>{ text }</p>) }

        { image && (<Image src={defaultPic} />)}
      </div>
    </div>
  )
}

Note.propTypes = {
  header: Types.string,
  text: Types.string,
  image: Types.bool,
  dragItem: Types.shape({
    type: Types.string.isRequired,
    id: Types.string.isRequired,
    columnIndex: Types.number.isRequired
  }).isRequired,
  onNoteDrop: Types.func.isRequired,
  onCanDrop: Types.func.isRequired
}

export default Note
