import React from 'react'
import { Modal, Form, Input, TextArea, Button, ModalActions } from 'semantic-ui-react'
import Types from 'prop-types'

const AddNoteModal = ({ open, onClose }) => (
  <Modal open={open} onClose={onClose} closeIcon>
    <Form style={{ padding: 8 }}>
      <Input fluid size='big'/>
      <TextArea rows={10} />
    </Form>

    <ModalActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button positive>Save</Button>
    </ModalActions>

  </Modal>
)

AddNoteModal.propTypes = {
  open: Types.bool.isRequired,
  onClose: Types.func.isRequired
}

export default AddNoteModal
