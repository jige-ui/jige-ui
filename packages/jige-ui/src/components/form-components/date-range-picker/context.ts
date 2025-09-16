import { esday } from "esday";
import { batch } from "solid-js";
import { createComponentState } from "solid-tiny-context";
import { dayes } from "~/common/dayes";
import {
  checkTimeValue,
  parseDateStr,
  valiDateStr,
} from "../date-picker/utils";

export const context = createComponentState({
  state: () => ({
    value: ["", ""] as [string, string],
    dateValue: ["", ""] as [string, string],
    timeValue: ["00:00:00", "00:00:00"] as [string, string],
    previewMode: false,
    disabled: false,
    placeholder: ["开始日期", "结束日期"] as [string, string],
    currYearMonthData: {
      fromYear: 0,
      fromMonth: 0,
      toYear: 0,
      toMonth: 0,
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
    fromInst() {
      return dayes(this.state.dateValue[0]);
    },
    toInst() {
      return dayes(this.state.dateValue[1]);
    },
    safeFromInst() {
      return this.state.fromInst.isValid() ? this.state.fromInst : dayes();
    },
    safeToInst() {
      return this.state.toInst.isValid() ? this.state.toInst : dayes();
    },
    isDateTime() {
      return this.state.type === "datetime";
    },
    previewValue() {
      let fromValue = "";
      if (this.state.fromInst.isValid()) {
        fromValue = this.state.fromInst.format("YYYY-MM-DD");
        if (this.state.isDateTime) {
          fromValue += ` ${this.state.timeValue[0]}`;
        }
      }
      let toValue = "";
      if (this.state.toInst.isValid()) {
        toValue = this.state.toInst.format("YYYY-MM-DD");
        if (this.state.isDateTime) {
          toValue += ` ${this.state.timeValue[1]}`;
        }
      }
      return [fromValue, toValue] as [string, string];
    },
    isEmpty() {
      return this.state.value[0] === "" && this.state.value[1] === "";
    },
  },
  methods: {
    setDateValue(lastValue: string) {
      const fromInst = this.state.fromInst;
      const toInst = this.state.toInst;
      batch(() => {
        if (!fromInst.isValid()) {
          this.actions.setState("dateValue", 0, lastValue);
          return;
        }
        if (!toInst.isValid()) {
          this.actions.setState("dateValue", 1, lastValue);
          if (this.state.fromInst > this.state.toInst) {
            this.actions.setState(
              "dateValue",
              1,
              this.state.fromInst.format("YYYY-MM-DD")
            );
            this.actions.setState("dateValue", 0, lastValue);
          }
          return;
        }

        this.actions.setState("dateValue", ["", ""]);
        this.actions.setState("dateValue", 0, lastValue);
      });
    },
    setPreviewValue(value: [string, string]) {
      const fromVals = parseDateStr(value[0]);
      const toVals = parseDateStr(value[1]);
      batch(() => {
        this.actions.setState("dateValue", 0, fromVals[0]);
        this.actions.setState("timeValue", 0, fromVals[1] || "00:00:00");
        this.actions.setState("dateValue", 1, toVals[0]);
        this.actions.setState("timeValue", 1, toVals[1] || "00:00:00");
      });
    },
    setValue(value: [string, string]) {
      let realValue = [...value] as [string, string];
      if (esday(value[0]) > esday(value[1])) {
        realValue = [value[1], value[0]];
      }
      batch(() => {
        this.actions.setPreviewValue(realValue);
        this.actions.syncPreviewToValue();
      });
    },
    syncValueToPreview() {
      const fromVals = parseDateStr(this.state.value[0]);
      const toVals = parseDateStr(this.state.value[1]);
      batch(() => {
        this.actions.setState("dateValue", 0, fromVals[0]);
        this.actions.setState("timeValue", 0, fromVals[1] || "00:00:00");
        this.actions.setState("dateValue", 1, toVals[0]);
        this.actions.setState("timeValue", 1, toVals[1] || "00:00:00");
      });
    },
    syncPreviewToValue() {
      this.actions.setState("value", this.state.previewValue);
    },
    updateCurrYearMonthData() {
      this.actions.setState("currYearMonthData", {
        fromYear: this.state.safeFromInst.year(),
        fromMonth: this.state.safeFromInst.month(),
        toYear: this.state.safeToInst.year(),
        toMonth: this.state.safeToInst.isSame(this.state.safeFromInst, "month")
          ? this.state.safeFromInst.month() + 1
          : this.state.safeToInst.month(),
      });
    },
    blurTrigger() {
      const [ref1, ref2] = this.state.triggerRefs;

      ref1?.blur();
      ref2?.blur();
    },
    checkDateStr(value: string) {
      const isDate = valiDateStr(value.split(" ")[0]);
      if (isDate && this.state.isDateTime) {
        const timeValue = value.split(" ")[1];
        return checkTimeValue(timeValue, "second");
      }
      return isDate;
    },
    clear() {
      this.actions.setValue(["", ""]);
    },
  },
});
