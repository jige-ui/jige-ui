import type { DialogFactory, DialogInst } from './types'
import { createUniqueId } from 'solid-js'
import { context } from './context'
import { Provider } from './Provider'

export function useDialog(): DialogFactory {
  const [,actions] = context.useContext()
  function createInst(
    inst: Omit<DialogInst, 'id'>,
  ) {
    actions.addInst({
      ...inst,
      id: createUniqueId(),
    })
  }
  const dialog: DialogFactory = {} as DialogFactory
  const keys = ['error', 'success', 'warning', 'info'] as const

  keys.forEach((type) => {
    dialog[type] = (contentOrConf: string | Omit<DialogInst, 'id' | 'type'>) => {
      if (typeof contentOrConf === 'string') {
        createInst({
          type,
          content: contentOrConf,
          title: type,
        })
      }
      else {
        createInst({
          type,
          ...contentOrConf,
        })
      }
    }
  })

  return dialog
}

export { Provider as JigeDialogProvider }

export * from './types'
