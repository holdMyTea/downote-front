import React, { useState } from 'react'
import { Modal, Form, Input, TextArea, Button, ModalActions, Icon } from 'semantic-ui-react'
import Types from 'prop-types'

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
    <Modal open={open} onClose={onClose} closeIcon>

      {
        onDelete && (
          <Icon
            name='trash alternate'
            onClick={handeleDelete}
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
          size='big'
          fluid />

        {/* Note's text input */}
        <TextArea
          value={textValue}
          onChange={onTextChange}
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
