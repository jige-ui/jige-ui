import { type MaybeAccessor, access } from '@solid-primitives/utils'
import { onCleanup } from 'solid-js'
import { createWatch } from '.'

export function createInterval(
  callback: () => void,
  interval: MaybeAccessor<number>,
  immediate = false,
) {
  let timer: number | undefined | NodeJS.Timeout
  const start = () => {
    if (timer) return
    timer = setInterval(() => {
      callback()
    }, access(interval))
    if (immediate) {
      callback()
    }
  }

  start()

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = undefined
    }
  }

  onCleanup(() => {
    stop()
  })

  createWatch(
    () => access(interval),
    (newInterval) => {
      stop()
      if (newInterval > 0) {
        start()
      }
    },
    { defer: true },
  )

  return stop
}
