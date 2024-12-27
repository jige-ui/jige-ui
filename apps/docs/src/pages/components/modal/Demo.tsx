import { Button, Modal } from 'jige-ui'

export function Demo() {
  return (
    <Modal>
      <Modal.Trigger>
        <Button>Open Modal</Button>
      </Modal.Trigger>
      <Modal.Content>
        <div>
          <h1>Hello, World!</h1>
          <p>This is a modal dialog.</p>
        </div>
      </Modal.Content>
    </Modal>
  )
}
