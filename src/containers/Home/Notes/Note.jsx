import React, { useState } from 'react'
import { Header, Image } from 'semantic-ui-react'
import { useDrag, useDrop } from 'react-dnd'
import Types from 'prop-types'

import AddNoteModal from './AddNoteModal'

const defaultPic = process.env.PUBLIC_URL + 'images/defaultPic.png'

const styles = {
  backgroundColor: 'lightyellow',
  padding: '10px',
  marginBottom: '20px',
  border: '1px solid silver',
  borderRadius: 3
}

/**
 * A basic Note view, handles both drag and drop
 * @param {Object} props
 * @param {string} [props.header=''] - note's header
 * @param {string} [props.text=''] - note's text
 * @param {boolean} [props.image] - flag to display the image (temporal abstraction)
 * @param {Object} props.dragItem - data object to contain the drag information
 * @param {string} props.dragItem.type - should be 'Note'
 * @param {string} props.dragItem.id - the id of the current (dragged) note
 * @param {number} props.dragItem.columnIndex - the column the Note belongs to
 * @param {function} props.onNoteDrop - the function to be called when a Note dropped on this Note
 * @param {function} props.onCanDrop - the function that checks whether a note can be droped on this note
 * @param {function} props.onEdit - functions that's called when the note is updated
 * @param {function} props.onEdit - functions that's called when the note is deleted
 */
const Note = ({ header, text, image, dragItem, onNoteDrop, onCanDrop, onEdit, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
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

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div ref={drop}
        onClick={() => setModalOpen(true)}
        style={{
          paddingTop: isOver && canDrop ? '40px' : 0,
          opacity: isDragging ? 0.5 : 1,
          transition: '500ms'
        }}>

        <div style={styles} ref={drag}>
          { header && (<Header as='h3'>{ header }</Header>) }

          { text && (<p>{ text }</p>) }

          { image && (<Image src={defaultPic} />)}
        </div>

      </div>

      {modalOpen && (
        <AddNoteModal
          header={header}
          text={text}
          onClose={() => setModalOpen(false)}
          onDelete={onDelete}
          onSave={onEdit}
        />
      )}
    </>
  )
}

Note.propTypes = {
  header: Types.string,
  text: Types.string,
  image: Types.bool,
  dragItem: Types.shape({
    type: Types.string.isRequired,
    id: Types.oneOfType([ Types.number, Types.string ]),
    columnIndex: Types.number.isRequired
  }).isRequired,
  onNoteDrop: Types.func.isRequired,
  onCanDrop: Types.func.isRequired,
  onEdit: Types.func.isRequired,
  onDelete: Types.func.isRequired
}

export default Note
