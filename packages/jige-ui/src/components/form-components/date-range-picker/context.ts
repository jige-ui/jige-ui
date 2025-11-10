import { batch } from "solid-js";
import { createComponentState } from "solid-tiny-context";
import {
  type DateArgs,
  formatToDateTime,
  getMonth,
  getTimestamp,
  getYear,
} from "time-core";

function stampToString(timestamp: number, type: "datetime" | "date") {
  const datetime = formatToDateTime(timestamp);
  if (type === "datetime") {
    return datetime;
  }

  return datetime.split(" ")[0];
}

function toPreviews(
  timestamps: [number | null, number | null],
  type: "datetime" | "date"
): [string, string] {
  const previews = timestamps.map((v) => {
    if (v === null || Number.isNaN(v)) {
      return "";
    }
    return stampToString(v, type);
  }) as [string, string];

  return previews;
}

function previewToValues(previews: [string, string]) {
  return previews.map((v) => {
    const time = getTimestamp(v);
    if (Number.isNaN(time)) {
      return null;
    }
    return getTimestamp(v);
  }) as [number | null, number | null];
}
export const context = createComponentState({
  state: () => ({
    timestamps: [null, null] as [number | null, number | null],
    previewValues: ["", ""] as [string, string],
    previewMode: false,
    disabled: false,
    placeholder: ["开始日期", "结束日期"] as [string, string],
    currYearMonthData: {
      leftYear: 0,
      leftMonth: 0,
      rightYear: 0,
      rightMonth: 0,
    },
    name: "",
    type: "date" as "datetime" | "date",
    triggerRefs: [null, null] as [
      null | HTMLInputElement,
      null | HTMLInputElement,
    ],
    focused: false,
  }),
  getters: {
    isDateTime() {
      return this.state.type === "datetime";
    },
    previewTimeStrs() {
      if (this.state.isDateTime) {
        return this.state.previewValues.map((v) => v.split(" ")[1]);
      }

      return ["00:00:00", "00:00:00"];
    },
    previewDateStrs() {
      return this.state.previewValues.map((v) => v.split(" ")[0]);
    },
  },
  methods: {
    setPreviewDate(date: string) {
      const leftDate = this.state.previewDateStrs[0];
      const rightDate = this.state.previewDateStrs[1];
      let newDate = date;
      batch(() => {
        if (leftDate === "") {
          if (this.state.isDateTime) {
            newDate = `${date} ${this.state.previewTimeStrs[0]}`;
          }
          this.actions.setState("previewValues", 0, newDate);
          return;
        }
        if (rightDate === "") {
          if (getTimestamp(leftDate) > getTimestamp(date)) {
            this.actions.setState(
              "previewValues",
              1,
              this.state.previewValues[0]
            );
            if (this.state.isDateTime) {
              newDate = `${date} ${this.state.previewTimeStrs[0]}`;
            }
            this.actions.setState("previewValues", 0, newDate);
          } else {
            if (this.state.isDateTime) {
              newDate = `${date} ${this.state.previewTimeStrs[1]}`;
            }
            this.actions.setState("previewValues", 1, newDate);
          }
          return;
        }

        this.actions.setState("previewValues", ["", ""]);
      });
    },
    setPreviewValue(value: [string, string]) {
      this.actions.setState("previewValues", value);
    },

    setValue(value: [DateArgs, DateArgs]) {
      const [leftVal, rightVal] = value
        .map((v) => {
          const time = getTimestamp(v);
          if (Number.isNaN(time)) {
            return null;
          }
          return time;
        })
        .sort();

      if (
        this.state.timestamps[0] === leftVal &&
        this.state.timestamps[1] === rightVal
      ) {
        return;
      }

      batch(() => {
        this.actions.setPreviewValue(
          toPreviews([leftVal, rightVal] as [number, number], this.state.type)
        );
        this.actions.syncPreviewToValue();
      });
    },

    syncValueToPreview() {
      this.actions.setState(
        "previewValues",
        toPreviews(this.state.timestamps, this.state.type)
      );
    },
    syncPreviewToValue() {
      this.actions.setState(
        "timestamps",
        previewToValues(this.state.previewValues)
      );
    },
    updateCurrYearMonthData() {
      let [leftDate, rightDate] = this.state.timestamps;

      if (leftDate === null) {
        leftDate = Date.now();
      }
      if (rightDate === null) {
        rightDate = Date.now();
      }

      if (leftDate > rightDate) {
        const a = leftDate;
        leftDate = rightDate;
        rightDate = a;
      }

      this.actions.setState("currYearMonthData", {
        leftYear: getYear(leftDate),
        leftMonth: getMonth(leftDate),
        rightYear: getYear(rightDate),
        rightMonth:
          getMonth(rightDate) === getMonth(leftDate)
            ? getMonth(leftDate) + 1
            : getMonth(rightDate),
      });
    },
    blurTrigger() {
      const [ref1, ref2] = this.state.triggerRefs;

      ref1?.blur();
      ref2?.blur();
    },
    clear() {
      this.actions.setValue(["", ""]);
    },
  },
});
