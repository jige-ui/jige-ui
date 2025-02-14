import type { ToastInst } from './types'
import { createComponentState } from 'solid-uses'

export const context = createComponentState({
  state: () => ({
    insts: [] as ToastInst[],
  }),
  methods: {
    addInst(inst: ToastInst) {
      this.actions.setState('insts', prev => [...prev, inst])
    },

    removeInst(id: string) {
      this.actions.setState('insts', prev => prev.filter(inst => inst.id !== id))
    },
  },
})
