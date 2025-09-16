import { createComponentState } from "solid-tiny-context";

export const context = createComponentState({
  state: () => ({
    disabled: false,
    value: undefined as any,
    options: [] as { label: string; value: any }[],
    listItemHeight: 20,
    listItemWidth: 200,
    originY: 0,
    placeholder: "",
    name: "combo-box",
    isCalculating: true,
    offset: 0,
    refTrigger: null as HTMLElement | null,
    editableValue: "",
    scrollTop: 0,
    editable: false,
  }),
  getters: {
    realOptions() {
      if (this.state.editable) {
        return this.state.options.filter((item) => {
          return item.label
            .toLowerCase()
            .includes(this.state.editableValue.toLowerCase());
        });
      }
      return this.state.options;
    },
    realOptionIndex() {
      return this.state.realOptions.findIndex(
        (item) => item.value === this.state.value
      );
    },
    valueIndex() {
      return this.state.options.findIndex(
        (item) => item.value === this.state.value
      );
    },
    valueLabel() {
      const index = this.state.valueIndex;
      if (index === -1) {
        return "";
      }
      return this.state.options[index].label;
    },
  },
  methods: {
    setValue<T>(value: T) {
      this.actions.setState("value", value);
    },
    setName(name: string) {
      this.actions.setState("name", name);
    },
    setDisabled(disabled: boolean) {
      this.actions.setState("disabled", disabled);
    },
  },
});
