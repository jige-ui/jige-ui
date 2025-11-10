import { createComponentState } from "solid-tiny-context";
import { inRange } from "solid-tiny-utils";
import {
  type DateArgs,
  formatToDateTime,
  formatToIsoZulu,
  getMonth,
  getTimestamp,
  getYear,
} from "time-core";
import type {
  DatePickerPreviewer,
  DatePickerToValueFunc,
  DatePickerType,
} from "./types";

const today = Date.now();

const defaultToPreview = (
  timestamp: number | null,
  type: DatePickerType
): string => {
  if (timestamp === null) {
    return "";
  }
  const datetime = formatToDateTime(timestamp);
  if (type === "datetime") {
    return datetime;
  }
  return datetime.split(" ")[0];
};

// NAN for invalid date
const defaultToTimestamp = (
  preview: string,
  _type: DatePickerType
): number | null => {
  if (preview === "") {
    return null;
  }
  return getTimestamp(preview);
};

export const context = createComponentState({
  state: () => ({
    timestamp: null as number | null,
    previewMode: false,
    previewValue: "",
    name: "",
    placeholder: "",
    currYear: getYear(today),
    currMonth: getMonth(today),
    activePanel: "day",
    type: "date" as DatePickerType,
    dateRange: [
      getTimestamp("1800-01-01T00:00:00.000Z"),
      getTimestamp("2200-01-01T23:59:59.999Z"),
    ] as [number, number],
    hlDates: [] as string[],
    dsDates: [] as string[],
    hlYears: [] as number[],
    hlMonths: [] as string[],
    triggerRef: null as HTMLInputElement | null,
    disabled: false,
    focused: false,
  }),
  getters: {
    defaultPanel() {
      return "day";
    },
    isDateTime() {
      return this.state.type === "datetime";
    },
    previewTimestamp() {
      return this.nowrapData.previewer.toTimestamp(
        this.state.previewValue,
        this.state.type
      );
    },
    previewDateStr() {
      const time = this.state.previewTimestamp;
      if (time === null || Number.isNaN(time)) {
        return "";
      }
      const datetime = formatToDateTime(time);
      return datetime.split(" ")[0];
    },
    previewTimeStr() {
      const time = this.state.previewTimestamp;
      if (time === null || Number.isNaN(time)) {
        return "";
      }
      const datetime = formatToDateTime(time);
      return datetime.split(" ")[1];
    },
  },
  methods: {
    syncPreviewToValue() {
      const time = this.nowrapData.previewer.toTimestamp(
        this.state.previewValue,
        this.state.type
      );

      if (time !== null && !this.actions.isInDateRange(time)) {
        return;
      }

      this.actions.setState("timestamp", time);
    },

    syncValueToPreview() {
      this.actions.setState(
        "previewValue",
        this.nowrapData.previewer.toPreview(
          this.state.timestamp,
          this.state.type
        )
      );
    },

    setPreviewValue(value: number | null) {
      if (Number.isNaN(value)) {
        return;
      }

      this.actions.setState(
        "previewValue",
        this.nowrapData.previewer.toPreview(value, this.state.type)
      );
    },

    setTimestamp(value: DateArgs | null) {
      if (value === null) {
        this.actions.setState("timestamp", null);
        return;
      }
      const stamp = getTimestamp(value);
      if (Number.isNaN(stamp)) {
        return;
      }
      this.actions.setState("timestamp", stamp);
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

    isInDateRange(value: DateArgs) {
      const minTimestamp = getTimestamp(this.state.dateRange[0]);
      const maxTimestamp = getTimestamp(this.state.dateRange[1]);
      return inRange(getTimestamp(value), minTimestamp, maxTimestamp);
    },

    setName(name: string) {
      this.actions.setState("name", name);
    },

    setDisabled(disabled: boolean) {
      this.actions.setState("disabled", disabled);
    },

    setActivePanel(panel: string) {
      this.actions.setState("activePanel", panel);
    },

    setPreviewMode(mode: boolean) {
      this.actions.setState("previewMode", mode);
    },

    clear() {
      this.actions.setState("timestamp", null);
    },
  },
  nowrapData: () => ({
    previewer: {
      toTimestamp: defaultToTimestamp,
      toPreview: defaultToPreview,
    } as DatePickerPreviewer,
    toValue: ((timestamp: number | null) => {
      if (timestamp === null) {
        return "";
      }
      return formatToIsoZulu(timestamp);
    }) as DatePickerToValueFunc<any>,
  }),
});
