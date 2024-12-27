import type { DialogInst } from './types'
import { createUniqueId } from 'solid-js'
import { context } from './context'
import { Provider } from './Provider'

export function useDialog() {
  const [,actions] = context.useContext()
  function createInst(
    inst: Omit<DialogInst, 'id'>,
  ) {
    actions.addInst({
      ...inst,
      id: createUniqueId(),
    })
  }
  const dialog = {
    error(conf: Omit<DialogInst, 'type' | 'id'>) {
      createInst({ ...conf, type: 'error' })
    },
    success(conf: Omit<DialogInst, 'type' | 'id'>) {
      createInst({ ...conf, type: 'success' })
    },
    warning(conf: Omit<DialogInst, 'type' | 'id'>) {
      createInst({ ...conf, type: 'warning' })
    },
  }

  return dialog
}

export { Provider as JigeDialogProvider }
