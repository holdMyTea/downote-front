import React, { useState } from 'react'
import { Modal, Form, Input, TextArea, Button, ModalActions } from 'semantic-ui-react'
import Types from 'prop-types'

const AddNoteModal = ({ open, onClose, onSave }) => {
  const [header, setHeader] = useState('')
  const onHeaderChange = event => setHeader(event.target.value)

  const [text, setText] = useState('')
  const onTextChange = event => setText(event.target.value)

  const handleSave = () => {
    onSave(header, text)
    setHeader('') // erasing fields onSave
    setText('')
    onClose() // closing
  }

  return (
    <Modal open={open} onClose={onClose} closeIcon>
      <Form style={{ padding: 8 }}>
        {/* Header input */}
        <Input
          value={header}
          onChange={onHeaderChange}
          size='big'
          fluid />

        {/* Note's text input */}
        <TextArea
          value={text}
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
  open: Types.bool.isRequired,
  onClose: Types.func.isRequired,
  onSave: Types.func.isRequired
}

export default AddNoteModal
