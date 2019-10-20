import React, { useState } from 'react'
import { Modal, Form, Input, TextArea, Button, ModalActions, Icon } from 'semantic-ui-react'
import Types from 'prop-types'

/**
 * Modal for adding/editing notes
 * @param {Object} props
 * @param {boolean} [props.open=true]
 * @param {string} [props.header=''] - prefilled value for the header field
 * @param {string} [props.text=''] - prefilled value for the text field
 * @param {function} props.onClose - function to be called when modal is closed
 * @param {function} props.onSave - function to be called when `Save` button is clicked
 * @param {function} [props.onDelete] - function to be called when modal the `Trashbin` icon is clicked (won't be rendered if `onDelete` is null)
 */
const AddNoteModal = ({ open = true, header = '', text = '', onClose, onSave, onDelete }) => {
  const [headerValue, setHeader] = useState(header)
  const onHeaderChange = event => setHeader(event.target.value)

  const [textValue, setText] = useState(text)
  const onTextChange = event => setText(event.target.value)

  const handleSave = () => {
    onSave(headerValue, textValue)
    setHeader('') // erasing fields onSave
    setText('')
    onClose() // closing
  }

  const handeleDelete = () => {
    onDelete()
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} closeIcon data-testid='add-note-modal'>

      {
        onDelete && (
          <Icon
            name='trash alternate'
            onClick={handeleDelete}
            title='Delete note'
            size='large'
            style={{
              margin: '3 3 3 95%'
            }}
          />
        )
      }

      <Form style={{ padding: 8 }}>
        {/* Header input */}
        <Input
          value={headerValue}
          onChange={onHeaderChange}
          placeholder='Header'
          size='big'
          fluid />

        {/* Note's text input */}
        <TextArea
          value={textValue}
          onChange={onTextChange}
          placeholder='Text'
          rows={10} />
      </Form>

      <ModalActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} positive>Save</Button>
      </ModalActions>

    </Modal>
  )
}

AddNoteModal.propTypes = {
  open: Types.bool,
  header: Types.string,
  text: Types.string,
  onClose: Types.func.isRequired,
  onSave: Types.func.isRequired,
  onDelete: Types.func
}

export default AddNoteModal
