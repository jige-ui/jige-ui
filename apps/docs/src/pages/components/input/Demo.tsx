import { Input } from 'jige-ui'
import { createSignal } from 'solid-js'

export function Demo() {
  const [value, setValue] = createSignal('')
  return (
    <div class="flex flex-col gap-2">
      <Input value={value()} onChange={setValue} type="textarea" placeholder="Type something here" />
      <Input value={value()} onChange={setValue} placeholder="Type something here" />
      <Input value={value()} onChange={setValue} type="password" placeholder="Type something here" />
    </div>
  )
}
