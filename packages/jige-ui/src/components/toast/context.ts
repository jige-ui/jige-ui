import { createComponentState } from 'solid-uses'
import type { ToastInst } from './types'

export const context = createComponentState({
  state: () => ({
    insts: [] as ToastInst[],
    defaultTimeout: 3000,
  }),
  methods: {
    addInst(inst: ToastInst) {
      this.actions.setState('insts', (prev) => [...prev, inst])
    },

    removeInst(id: string) {
      this.actions.setState('insts', (prev) => prev.filter((inst) => inst.id !== id))
    },
  },
})
