import { createComponentState } from 'solid-tiny-context';

export const context = createComponentState({
  state: () => ({
    hour: 0,
    minute: 0,
    second: 0,
  }),
  methods: {
    setHour(hour: number) {
      this.actions.setState('hour', hour);
    },
    setMinute(minute: number) {
      this.actions.setState('minute', minute);
    },
    setSecond(second: number) {
      this.actions.setState('second', second);
    },
  },
});
