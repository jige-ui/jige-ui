import type { EsDay } from 'esday'
import { isArray } from 'radash'
import { createComponentState } from 'solid-uses'
import { dayes } from '~/common/dayes'
import type { DateTypes } from './types'

const today = dayes()

export const context = createComponentState({
  state: () => ({
    value: '',
    valueFormat: 'YYYY-MM-DD',
    name: '',
    placeholder: '',
    currYear: today.year(),
    currMonth: today.month(),
    activePanel: 'day',
    type: 'date',
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
    defaultPanel() {
      switch (this.state.type) {
        case 'month':
          return 'month'
        case 'year':
          return 'year'
        default:
          return 'day'
      }
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
    toValueString(
      value: DateTypes | DateTypes[],
    ): typeof value extends DateTypes[] ? string[] : string {
      if (isArray(value)) {
        // @ts-expect-error value is DateTypes[]
        return value.map((v) => dayes(v, this.state.valueFormat).format(this.state.valueFormat))
      }
      return dayes(value, this.state.valueFormat).format(this.state.valueFormat)
    },
    setValue(value: DateTypes) {
      if (value === '') {
        this.actions.setState('value', '')
        return true
      }

      const inst = dayes(value, this.state.valueFormat)

      if (inst.isValid()) {
        if (
          this.actions.isInDateRange(inst) &&
          !this.state.dsDates.includes(inst.format('YYYY-MM-DD'))
        ) {
          this.actions.setState('value', inst.format(this.state.valueFormat))
          return true
        }
      }

      return false
    },

    isSelected(value: DateTypes) {
      const stateValue = isArray(this.state.value) ? this.state.value : [this.state.value]
      return stateValue.includes(this.actions.toValueString(value))
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
