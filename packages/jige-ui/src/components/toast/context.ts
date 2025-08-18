import { createComponentState } from 'solid-tiny-context';
import type { ToastInst } from './types';

export const context = createComponentState({
  state: () => ({
    insts: [] as ToastInst[],
    defaultTimeout: 5000,
  }),
  methods: {
    addInst(inst: ToastInst) {
      this.actions.setState('insts', (prev) => [...prev, inst]);
    },

    removeInst(id: string) {
      this.actions.setState('insts', (prev) =>
        prev.filter((inst) => inst.id !== id)
      );
    },
  },
});
