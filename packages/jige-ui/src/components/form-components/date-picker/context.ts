import type { EsDay } from 'esday';
import { batch } from 'solid-js';
import { createComponentState } from 'solid-tiny-context';
import { dayes } from '~/common/dayes';
import type { DateTypes } from './types';
import { checkTimeValue, parseDateStr, valiDateStr } from './utils';

const today = dayes();

export const context = createComponentState({
  state: () => ({
    value: '',
    dateValue: '',
    timeValue: '00:00:00',
    previewMode: false,
    valueFormat: 'YYYY-MM-DD',
    name: '',
    placeholder: '',
    currYear: today.year(),
    currMonth: today.month(),
    activePanel: 'day',
    type: 'date',
    dateRange: ['1800-01-01', '2200-01-01'] as [DateTypes, DateTypes],
    hlDates: [] as string[],
    dsDates: [] as string[],
    hlYears: [] as number[],
    hlMonths: [] as string[],
    triggerRef: null as HTMLInputElement | null,
    disabled: false,
    focused: false,
  }),
  getters: {
    inst() {
      return dayes(this.state.dateValue);
    },
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
        case 'year':
          return 'year';
        default:
          return 'day';
      }
    },
    isDateTime() {
      return ['hour', 'minute', 'second'].includes(this.state.type);
    },
    previewValue() {
      if (!this.state.dateValue) {
        return '';
      }

      if (this.state.isDateTime) {
        return `${this.state.dateValue} ${this.state.timeValue}`;
      }
      return this.state.dateValue;
    },
  },
  methods: {
    syncPreviewToValue() {
      this.actions.setState('value', this.state.previewValue);
    },

    syncValueToPreview() {
      const [date, time] = parseDateStr(this.state.value);
      this.actions.setState({
        dateValue: date,
        timeValue: time || '00:00:00',
      });
    },

    setValue(value: string) {
      if (!value.trim()) {
        batch(() => {
          this.actions.setState({
            dateValue: '',
            timeValue: '00:00:00',
          });
          this.actions.syncPreviewToValue();
        });
      }

      if (!this.actions.isInDateRange(dayes(value))) {
        return;
      }

      const [date, time] = parseDateStr(value);

      batch(() => {
        this.actions.setState({
          dateValue: date,
          timeValue: time || '00:00:00',
        });
        this.actions.syncPreviewToValue();
      });
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

    isInDateRange(value: EsDay) {
      return value >= this.state.fromInst && value <= this.state.toInst;
    },

    parseDate(value: DateTypes) {
      return dayes(value, this.state.valueFormat);
    },

    setName(name: string) {
      this.actions.setState('name', name);
    },

    setDisabled(disabled: boolean) {
      this.actions.setState('disabled', disabled);
    },

    setActivePanel(panel: string) {
      this.actions.setState('activePanel', panel);
    },

    setPreviewMode(mode: boolean) {
      this.actions.setState('previewMode', mode);
    },

    checkDateStr(value: string) {
      const isDate = valiDateStr(
        value.split(' ')[0],
        this.state.type === 'month' ? 'month' : 'date'
      );
      if (isDate && this.state.isDateTime) {
        const timeStr = value.split(' ')[1];
        return checkTimeValue(
          timeStr,
          this.state.type as 'hour' | 'minute' | 'second'
        );
      }
      return isDate;
    },

    clear() {
      this.actions.setValue('');
    },
  },
});
