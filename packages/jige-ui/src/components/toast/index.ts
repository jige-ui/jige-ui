import type { ToastFactory, ToastInst } from './types'
import { createUniqueId } from 'solid-js'
import { context } from './context'
import { Provider } from './Provider'

export function useToast(): ToastFactory {
  const [,actions] = context.useContext()
  function createInst(
    inst: Omit<ToastInst, 'id'>,
  ) {
    actions.addInst({
      ...inst,
      id: createUniqueId(),
    })
  }
  const toast: ToastFactory = {} as ToastFactory
  const keys = ['error', 'success', 'warning', 'info'] as const

  keys.forEach((type) => {
    toast[type] = (contentOrConf: string | Omit<ToastInst, 'id' | 'type'>) => {
      if (typeof contentOrConf === 'string') {
        createInst({
          type,
          content: contentOrConf,
          title: type,
          timeout: 3000,
        })
      }
      else {
        createInst({
          type,
          timeout: 3000,
          ...contentOrConf,
        })
      }
    }
  })

  return toast
}

export { Provider as JigeToastProvider }

export * from './types'
