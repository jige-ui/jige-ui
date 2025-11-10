import { batch } from "solid-js";
import { createComponentState } from "solid-tiny-context";
import { inRange } from "solid-tiny-utils";
import {
  addMonths,
  type DateArgs,
  getMonth,
  getTimestamp,
  getYear,
} from "time-core";

const today = Date.now();

export const panelContext = createComponentState({
  state: () => ({
    activePanel: "day",
    currYear: getYear(today),
    currMonth: getMonth(today),
    dateRange: [
      getTimestamp("1800-01-01T00:00:00.000Z"),
      getTimestamp("2200-01-01T23:59:59.999Z"),
    ] as [number, number],
    value: [] as string[],
    hlDates: [] as string[],
    dsDates: [] as string[],
    hlYears: [] as number[],
    hlMonths: [] as string[],
    disabled: false,
    multiple: false,
  }),
  getters: {
    defaultPanel() {
      return "day";
    },
  },
  methods: {
    setValue(value: string[]) {
      this.actions.setState("value", value);
    },
    setActivePanel(panel: string) {
      this.actions.setState("activePanel", panel);
    },
    monthHandle(step: number) {
      const { state, actions } = this;

      const d = addMonths(`${state.currYear}-${state.currMonth}-01`, step);

      if (this.actions.isInDateRange(d)) {
        batch(() => {
          actions.setCurrYear(getYear(d));
          actions.setCurrMonth(getMonth(d));
        });
      }
    },
    isInDateRange(value: DateArgs) {
      const minTimestamp = getTimestamp(this.state.dateRange[0]);
      const maxTimestamp = getTimestamp(this.state.dateRange[1]);

      return inRange(getTimestamp(value), minTimestamp, maxTimestamp);
    },
    setCurrYear(year: number) {
      const minYear = getYear(this.state.dateRange[0]);
      const maxYear = getYear(this.state.dateRange[1]);
      if (inRange(year, minYear, maxYear)) {
        this.actions.setState("currYear", year);
        return true;
      }

      return false;
    },

    setCurrMonth(month: number) {
      if (month >= 1 && month <= 12) {
        this.actions.setState("currMonth", month);
        return true;
      }
      return false;
    },
  },
});
