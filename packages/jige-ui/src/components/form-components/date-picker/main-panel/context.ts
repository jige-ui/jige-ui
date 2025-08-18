import type { EsDay } from 'esday';
import { batch } from 'solid-js';
import { createComponentState } from 'solid-tiny-context';
import { dayes } from '~/common/dayes';
import type { DateTypes } from '../types';

const today = dayes();

export const panelContext = createComponentState({
  state: () => ({
    activePanel: 'day',
    type: 'date',
    currYear: today.year(),
    currMonth: today.month(),
    dateRange: ['1800-01-01', '2200-01-01'] as [DateTypes, DateTypes],
    value: [] as string[],
    hlDates: [] as string[],
    dsDates: [] as string[],
    hlYears: [] as number[],
    hlMonths: [] as string[],
    disabled: false,
    multiple: false,
  }),
  getters: {
    fromInst() {
      return dayes(this.state.dateRange[0]);
    },
    toInst() {
      return dayes(this.state.dateRange[1]);
    },
    defaultPanel() {
      switch (this.state.type) {
        case 'month':
          return 'month';
        default:
          return 'day';
      }
    },
  },
  methods: {
    setValue(value: string[]) {
      this.actions.setState('value', value);
    },
    setActivePanel(panel: string) {
      this.actions.setState('activePanel', panel);
    },
    monthHandle(step: number) {
      const { state, actions } = this;
      const d = dayes(`${state.currYear}-${state.currMonth + 1}-01`).add(
        step,
        'month'
      );
      if (d >= state.fromInst && d <= state.toInst) {
        batch(() => {
          actions.setCurrYear(d.year());
          actions.setCurrMonth(d.month());
        });
      }
    },
    isInDateRange(value: EsDay) {
      return value >= this.state.fromInst && value <= this.state.toInst;
    },
    setCurrYear(year: number) {
      if (
        year >= this.state.fromInst.year() &&
        year <= this.state.toInst.year()
      ) {
        this.actions.setState('currYear', year);
        return true;
      }

      return false;
    },

    setCurrMonth(month: number) {
      if (month >= 0 && month <= 11) {
        this.actions.setState('currMonth', month);
        return true;
      }
      return false;
    },
  },
});
