import { Spin, Switcher } from 'jige-ui'
import { createSignal } from 'solid-js'

export function SpinDemo() {
  const [loading, setLoading] = createSignal(false)

  return (
    <div>
      <div>
        toggle loading:
        <Switcher value={loading()} onChange={setLoading} />
      </div>
      <Spin spinning={loading()} size={8}>
        <div class="bg-bluegray h-full">
          测试罢了
        </div>
      </Spin>
    </div>
  )
}
