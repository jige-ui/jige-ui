import { createComponentState } from 'solid-tiny-context';
import type { DialogInst } from './types';

export const context = createComponentState({
  state: () => ({
    insts: [] as DialogInst[],
    maybeTriggerRef: null as HTMLElement | null,
    timer: null as number | null,
  }),

  methods: {
    addInst(inst: DialogInst) {
      this.actions.setState('insts', (prev) => [...prev, inst]);
    },

    removeInst(id: string) {
      this.actions.setState('insts', (prev) =>
        prev.filter((inst) => inst.id !== id)
      );
    },

    setMaybeTriggerRef(ref: HTMLElement | null) {
      this.actions.setState('maybeTriggerRef', ref);

      if (this.state.timer) {
        clearTimeout(this.state.timer);
      }

      // clear maybeTriggerRef after 100ms
      // compatible with other trigger events
      this.actions.setState(
        'timer',
        setTimeout(() => {
          this.actions.setState('maybeTriggerRef', null);
        }, 100) as unknown as number
      );
    },
  },
});
