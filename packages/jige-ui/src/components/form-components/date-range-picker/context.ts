import { batch } from "solid-js";
import { createComponentState } from "solid-tiny-context";
import {
  type DateArgs,
  formatToDateTime,
  formatToIsoZulu,
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

export function previewToVal(previewStr: string) {
  const time = getTimestamp(previewStr);
  if (Number.isNaN(time)) {
    return null;
  }
  return time;
}

function previewToValues(previews: [string, string]) {
  return previews.map(previewToVal) as [number | null, number | null];
}

export const context = createComponentState({
  state: () => ({
    timestamps: [null, null] as [number | null, number | null],
    previewDates: ["", ""] as [string, string],
    previewTimes: ["", ""] as [string, string],
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
    previewTimestamps() {
      return this.state.previewDates.map((date, i) => {
        if (!date) {
          return null;
        }
        const datetime = `${date} ${this.state.previewTimes[i]}`;
        return getTimestamp(datetime.trim());
      }) as [number | null, number | null];
    },
    previewStrings(): [string, string] {
      return toPreviews(this.state.previewTimestamps, this.state.type);
    },
  },
  methods: {
    setPreviewDate(date: string) {
      const [leftDate, rightDate] = this.state.previewDates;
      batch(() => {
        if (leftDate === "") {
          this.actions.setState("previewDates", 0, date);
          return;
        }
        if (rightDate === "") {
          if (getTimestamp(leftDate) > getTimestamp(date)) {
            this.actions.setState("previewDates", 1, leftDate);
            this.actions.setState("previewDates", 0, date);
          } else {
            this.actions.setState("previewDates", 1, date || leftDate);
          }
          return;
        }
        this.actions.setState("previewDates", 1, "");

        if (date === leftDate) {
          this.actions.setState("previewDates", 0, rightDate);
        }

        if (date === rightDate) {
          this.actions.setState("previewDates", 0, leftDate);
        }

        if (![leftDate, rightDate].includes(date)) {
          this.actions.setState("previewDates", 0, date);
        }
      });
    },

    setPreviewValue(at: 0 | 1, timestamp: number | null) {
      const time = timestamp;
      batch(() => {
        if (time === null || Number.isNaN(timestamp)) {
          this.actions.setState("previewDates", at, "");
          this.actions.setState("previewTimes", at, "00:00:00");
        } else {
          const datetime = formatToDateTime(time);
          this.actions.setState("previewDates", at, datetime.split(" ")[0]);
          this.actions.setState("previewTimes", at, datetime.split(" ")[1]);
        }
      });
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
        this.actions.setPreviewValue(0, leftVal);
        this.actions.setPreviewValue(1, rightVal);
        this.actions.syncPreviewToValue();
      });
    },

    syncValueToPreview() {
      batch(() => {
        this.actions.setPreviewValue(0, this.state.timestamps[0]);
        this.actions.setPreviewValue(1, this.state.timestamps[1]);
      });
    },
    syncPreviewToValue() {
      this.actions.setState(
        "timestamps",
        previewToValues(this.state.previewStrings)
      );
    },
    updateCurrYearMonthData() {
      let [leftDate, rightDate] = this.state.previewTimestamps;

      if (Number.isNaN(leftDate) || leftDate === null) {
        leftDate = Date.now();
      }

      if (Number.isNaN(rightDate) || rightDate === null) {
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
  nowrapData: () => ({
    toValues: (timestamps: [number | null, number | null]) => {
      return timestamps.map((t) => {
        if (t === null || Number.isNaN(t)) {
          return "";
        }
        return formatToIsoZulu(t);
      }) as [any, any];
    },
  }),
});
