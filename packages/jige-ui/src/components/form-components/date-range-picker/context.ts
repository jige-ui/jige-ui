import { batch } from 'solid-js'
import { createComponentState } from 'solid-uses'
import { dayes } from '~/common/dayes'

export const context = createComponentState({
  state: () => ({
    value: ['', ''] as [string, string],
    disabled: false,
    placeholder: ['开始日期', '结束日期'] as [string, string],
    currYearMonthData: {
      fromYear: 0,
      fromMonth: 0,
      toYear: 0,
      toMonth: 0,
    },
    name: '',
  }),
  getters: {
    fromInst() {
      return dayes(this.state.value[0])
    },
    toInst() {
      return dayes(this.state.value[1])
    },
    safeFromInst() {
      return this.state.fromInst.isValid() ? this.state.fromInst : dayes()
    },
    safeToInst() {
      return this.state.toInst.isValid() ? this.state.toInst : dayes()
    },
  },
  methods: {
    setValue(lastValue: string) {
      const fromInst = this.state.fromInst
      const toInst = this.state.toInst
      batch(() => {
        if (!fromInst.isValid()) {
          this.actions.setState('value', 0, lastValue)
          return
        }
        if (!toInst.isValid()) {
          this.actions.setState('value', 1, lastValue)
          if (this.state.fromInst > this.state.toInst) {
            this.actions.setState('value', 1, this.state.fromInst.format('YYYY-MM-DD'))
            this.actions.setState('value', 0, lastValue)
          }
          return
        }

        this.actions.setState('value', ['', ''])
        this.actions.setState('value', 0, lastValue)
      })
    },
    updateCurrYearMonthData() {
      this.actions.setState('currYearMonthData', {
        fromYear: this.state.safeFromInst.year(),
        fromMonth: this.state.safeFromInst.month(),
        toYear: this.state.safeToInst.year(),
        toMonth: this.state.safeToInst.isSame(this.state.safeFromInst, 'month')
          ? this.state.safeFromInst.month() + 1
          : this.state.safeToInst.month(),
      })
    },
  },
})
