import { Collapse } from 'jige-ui'

export function Demo() {
  return (
    <Collapse>
      <Collapse.Trigger>
        <div class='flex bg-gray-300 items-center'>
          <div class='flex-grow-1'>trigger</div>
          <div class='flex items-center justify-center'>
            <Collapse.Arrow1 />
          </div>
        </div>
      </Collapse.Trigger>
      <Collapse.Content>
        <p class='p-4 bg-amber'>Content</p>
      </Collapse.Content>
    </Collapse>
  )
}
