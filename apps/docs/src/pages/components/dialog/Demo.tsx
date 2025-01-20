import { Button, useDialog } from 'jige-ui'
import { sleep } from 'radash'

export function Demo() {
  const dialog = useDialog()

  return (
    <div class="flex flex-col gap-10em">
      <div>
        <Button
          label="error"
          onClick={() => {
            dialog.error({
              title: 'error',
              content: 'err content',
              negativeText: 'cancel',
              positiveText: 'ok',
            })
          }}
        />
        <Button
          label="error2"
          onClick={() => {
            dialog.error('simple error')
          }}
        />
      </div>
      <div>
        <Button
          label="success"
          onClick={() => {
            dialog.success({
              title: 'success',
              content: 'success content',
              onNegativeClick: async () => {
                await sleep(2000)
              },
            })
          }}
        />
      </div>
      <div>
        <Button
          label="warning"
          onClick={() => {
            dialog.warning({
              title: 'warning',
              content: 'warning content',
              negativeText: 'cancel',
              positiveText: 'ok',
            })
          }}
        />
      </div>

    </div>

  )
}
