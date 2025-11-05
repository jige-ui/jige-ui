import { batch } from "solid-js";
import { createComponentState } from "solid-tiny-context";
import type { AsyncFn, MaybeAsyncFn } from "~/common/types";
import { isUndefined } from "~/common/types";
import { getValueFromPath } from "../utils";
import type { JigeFormValidatorCorrectReturn } from "../validator";

export const formContext = createComponentState({
  state: () => ({
    isTouched: false,
    isSubmitting: false,
    disabled: false,
    formData: {} as Record<string, any>,
    dirtyFields: {} as Record<string, boolean>,
    errorFields: {} as Record<string, JigeFormValidatorCorrectReturn[]>,
    validateFields: {} as Record<string, AsyncFn>,
    // form-level validate
    validate: {} as Record<string, any>,
  }),
  getters: {
    isDirty() {
      return Object.values(this.state.dirtyFields).some(Boolean);
    },
    isPristine() {
      return !this.state.isDirty;
    },
    canSubmit() {
      return (
        !(this.state.disabled || this.state.isSubmitting) &&
        Object.values(this.state.errorFields).every(
          (v) => !v.filter((e) => e.type === "error").length
        )
      );
    },
  },
  methods: {
    getFieldValue(key: string) {
      return getValueFromPath(this.state.formData, key);
    },
    setFieldValue(key: string, value: any | ((prev: any) => any)) {
      if (isUndefined(value)) {
        return;
      }
      // key probably has a dot-separated path
      const keys = key.split(".") as [string];

      // make sure every key in the path exists
      let current = this.state.formData;
      const tempKeys = [] as unknown as [string];
      for (let i = 0; i < keys.length - 1; i++) {
        const currentKey = keys[i];
        tempKeys.push(currentKey);
        if (isUndefined(current[currentKey])) {
          if (Number.isNaN(Number(keys[i + 1]))) {
            this.actions.setState("formData", ...tempKeys, {});
          } else {
            this.actions.setState("formData", ...tempKeys, []);
          }
        }
        current = current[currentKey];
      }

      this.actions.setState("formData", ...keys, value);
    },
    removeField(key: string) {
      const keys = key.split(".") as [string];
      this.actions.setState("formData", ...keys, undefined);
    },
    async handleSubmit() {
      if (this.state.disabled) {
        return;
      }
      await this.actions.validateFields();
      this.actions.setState("isTouched", true);
      if (!this.state.canSubmit) {
        return;
      }
      this.actions.setState("isSubmitting", true);
      await this.nowrapData.onSubmit(this.state.formData);
      this.actions.setState("isSubmitting", false);
    },
    handleReset() {
      if (this.state.disabled) {
        return;
      }
      batch(() => {
        const cloneInitialValues = JSON.parse(
          JSON.stringify(this.nowrapData.initialValues)
        );
        // value reset
        for (const key in this.state.formData) {
          this.actions.setFieldValue(key, cloneInitialValues[key]);
        }

        // dirty fields reset
        for (const key in this.state.dirtyFields) {
          this.actions.setState("dirtyFields", key, undefined!);
        }

        // error fields reset
        for (const key in this.state.errorFields) {
          this.actions.setState("errorFields", key, undefined!);
        }

        this.actions.setState("isTouched", false);
      });
    },
    async validateFields(
      key?: string
    ): Promise<
      typeof key extends string
        ? JigeFormValidatorCorrectReturn[]
        : Record<string, JigeFormValidatorCorrectReturn[]>
    > {
      if (key) {
        const validator = this.state.validateFields[key];
        if (validator) {
          await validator(undefined);
        }
      } else {
        const promises = Object.keys(this.state.validateFields).map(
          (fieldKey) => this.actions.validateFields(fieldKey)
        );
        await Promise.all(promises);
      }
      return (
        key ? this.state.errorFields[key] : this.state.errorFields
      ) as typeof key extends string
        ? JigeFormValidatorCorrectReturn[]
        : Record<string, JigeFormValidatorCorrectReturn[]>;
    },

    clearState(path: string) {
      batch(() => {
        this.actions.setState("dirtyFields", path, undefined!);
        this.actions.setState("errorFields", path, undefined!);
        this.actions.setState("validateFields", path, undefined!);
      });
    },
  },
  nowrapData: () => ({
    onSubmit: (() => {}) as MaybeAsyncFn<Record<string, any>>,
    initialValues: {} as Record<string, any>,
  }),
});
