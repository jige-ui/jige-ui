import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    name: "",
    type: "second" as "hour" | "minute" | "second",
    disabled: false,
    hour: -1,
    minute: 0,
    second: 0,
    triggerHeight: 32,
    triggerWidth: 128,
  }),
  getters: {
    typeIndex() {
      return ["hour", "minute", "second"].indexOf(this.state.type);
    },
    hasValue() {
      return this.state.hour >= 0;
    },
    hourStr() {
      if (this.state.hasValue) {
        return this.state.hour.toString().padStart(2, "0");
      }
      return "";
    },
    minuteStr() {
      if (this.state.hasValue) {
        return this.state.minute.toString().padStart(2, "0");
      }
      return "";
    },
    secondStr() {
      if (this.state.hasValue) {
        return this.state.second.toString().padStart(2, "0");
      }
      return "";
    },
    asStr() {
      if (this.state.hasValue) {
        return [this.state.hourStr, this.state.minuteStr, this.state.secondStr]
          .slice(0, this.state.typeIndex + 1)
          .join(":");
      }
      return "";
    },
  },
  methods: {
    setDisabled(bool: boolean) {
      this.actions.setState("disabled", bool);
    },
    setName(name: string) {
      this.actions.setState("name", name);
    },
    setValue(value: string) {
      let hour = 0;
      let minute = 0;
      let second = 0;
      const arr = value.split(":");
      if (arr.length > 0) {
        const v = Number.parseInt(arr[0], 10);
        if (v >= 0 && v < 24) {
          hour = v;
        }
      }
      if (arr.length > 1) {
        const v = Number.parseInt(arr[1], 10);
        if (v >= 0 && v < 60) {
          minute = v;
        }
      }
      if (arr.length > 2) {
        const v = Number.parseInt(arr[2], 10);
        if (v >= 0 && v < 60) {
          second = v;
        }
      }
      this.actions.setState({
        hour,
        minute,
        second,
      });
    },
  },
});
