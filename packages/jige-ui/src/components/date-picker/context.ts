import type { EsDay } from 'esday'
import type { DateTypes } from './types'
import { createComponentState } from 'solid-uses'
import { dayes } from '~/common/dayes'

const today = dayes()

export const context = createComponentState({
  state: () => ({
    value: today.format('YYYY-MM-DD'),
    valueFormat: 'YYYY-MM-DD',
    name: '',
    currYear: today.year(),
    currMonth: today.month(),
    activePanel: 'day',
    refTrigger: null as HTMLElement | null,
    dateRange: ['1800-01-01', '2200-01-01'] as [DateTypes, DateTypes],
    hlDates: [] as string[],
    dsDates: [] as string[],
    hlYears: [] as number[],
    hlMonths: [] as string[],
    disabled: false,
  }),
  getters: {
    inst() {
      return dayes(this.state.value, this.state.valueFormat)
    },
    fromInst() {
      return dayes(this.state.dateRange[0], this.state.valueFormat)
    },
    toInst() {
      return dayes(this.state.dateRange[1], this.state.valueFormat)
    },
  },
  methods: {
    monthHandle(step: number) {
      const { state, actions } = this
      const d = dayes(`${state.currYear}-${state.currMonth + 1}-01`).add(step, 'month')
      if (d >= state.fromInst && d <= state.toInst) {
        actions.setCurrYear(d.year())
        actions.setCurrMonth(d.month())
      }
    },
    setValue(value: DateTypes) {
      const inst = dayes(value, this.state.valueFormat)

      if (inst.isValid()) {
        if (inst >= this.state.fromInst && inst <= this.state.toInst) {
          this.actions.setState('value', inst.format(this.state.valueFormat))
          return true
        }
      }

      return false
    },

    setCurrYear(year: number) {
      if (year >= this.state.fromInst.year() && year <= this.state.toInst.year()) {
        this.actions.setState('currYear', year)
        return true
      }

      return false
    },

    setCurrMonth(month: number) {
      if (month >= 0 && month <= 11) {
        this.actions.setState('currMonth', month)
        return true
      }
      return false
    },

    isInDateRange(value: EsDay) {
      return value >= this.state.fromInst && value <= this.state.toInst
    },

    parseDate(value: DateTypes) {
      return dayes(value, this.state.valueFormat)
    },

  },
})
