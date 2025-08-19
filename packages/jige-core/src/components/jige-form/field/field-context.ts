import { createMemo, createSignal } from 'solid-js';
import { formContext } from '../form/context';
import {
  type JigeFormValidatorCorrectReturn,
  normalizeValidator,
} from '../validator';

export function getFieldContext(
  pathName: string,
  options: {
    validateOn: 'change' | 'blur';
    validateDebounceMs: number;
    validators: any[];
    validateFirst: boolean;
  }
) {
  const [formState, formActs] = formContext.useContext();
  const [isTouched, setIsTouched] = createSignal(false);
  const [isValidating, setIsValidating] = createSignal(false);

  // state
  const fieldValue = createMemo(() => formActs.getFieldValue(pathName));
  const isDirty = createMemo(() => formState.dirtyFields[pathName]);
  const errors = createMemo(() => formState.errorFields[pathName] || []);

  let timeoutId: number | undefined;

  // methods
  const setValue = (value: unknown) => {
    if (
      fieldValue() === value ||
      (Number.isNaN(value) && Number.isNaN(fieldValue()))
    ) {
      return false;
    }
    formActs.setFieldValue(pathName, value);
    return true;
  };

  const handleBlur = () => {
    setIsTouched(true);
    handleValidate();
  };

  const validate = async () => {
    const validationErrors = [] as JigeFormValidatorCorrectReturn[];
    for (const validator of options.validators) {
      const error = normalizeValidator(
        await validator(fieldValue(), formState.formData)
      );
      if (error) {
        validationErrors.push(error);
        if (options.validateFirst && error.type === 'error') {
          break;
        }
      }
    }
    formActs.setState('errorFields', pathName, validationErrors);
  };

  formActs.setState('validateFields', pathName, () => validate);

  const handleChange = (value: any) => {
    if (!setValue(value)) {
      return;
    }
    if (!isTouched()) {
      setIsTouched(true);
    }
    if (options.validateOn === 'change') {
      handleValidate();
    }
  };

  const handleValidate = () => {
    if (isValidating() || !isTouched()) {
      return;
    }
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(async () => {
      setIsValidating(true);
      await formActs.validateFields(pathName);
      setIsValidating(false);
    }, options.validateDebounceMs);
  };

  return [
    {
      name: pathName,
      get isTouched() {
        return isTouched();
      },
      get isValidating() {
        return isValidating();
      },
      get value() {
        return fieldValue();
      },
      get isDirty() {
        return isDirty();
      },
      get errors() {
        return errors();
      },
    },
    {
      setValue,
      handleBlur,
      handleChange,
      handleValidate,
    },
  ] as const;
}

export function createFieldContext(
  pathName: () => string,
  options: {
    validateOn: () => 'change' | 'blur';
    validateDebounceMs: () => number;
    validators: () => any[];
    validateFirst: () => boolean;
  }
) {
  const [formState, formActs] = formContext.useContext();
  const [isTouched, setIsTouched] = createSignal(false);
  const [isValidating, setIsValidating] = createSignal(false);

  // state
  const fieldValue = createMemo(() => formActs.getFieldValue(pathName()));
  const isDirty = createMemo(() => formState.dirtyFields[pathName()]);
  const errors = createMemo(() => formState.errorFields[pathName()] || []);

  let timeoutId: number | undefined;

  // methods
  const setValue = (value: unknown) => {
    if (
      fieldValue() === value ||
      (Number.isNaN(value) && Number.isNaN(fieldValue()))
    ) {
      return false;
    }
    formActs.setFieldValue(pathName(), value);
    return true;
  };

  const handleBlur = () => {
    setIsTouched(true);
    handleValidate();
  };

  const validate = async () => {
    const validationErrors = [] as JigeFormValidatorCorrectReturn[];
    for (const validator of options.validators()) {
      const error = normalizeValidator(
        await validator(fieldValue(), formState.formData)
      );
      if (error) {
        validationErrors.push(error);
        if (options.validateFirst() && error.type === 'error') {
          break;
        }
      }
    }
    formActs.setState('errorFields', pathName(), validationErrors);
  };

  formActs.setState('validateFields', pathName(), () => validate);

  const handleChange = (value: any) => {
    if (!setValue(value)) {
      return;
    }
    if (!isTouched()) {
      setIsTouched(true);
    }
    if (options.validateOn() === 'change') {
      handleValidate();
    }
  };

  const handleValidate = () => {
    if (isValidating() || !isTouched()) {
      return;
    }
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(async () => {
      setIsValidating(true);
      await formActs.validateFields(pathName());
      setIsValidating(false);
    }, options.validateDebounceMs());
  };

  return [
    {
      get name() {
        return pathName();
      },
      get isTouched() {
        return isTouched();
      },
      get isValidating() {
        return isValidating();
      },
      get value() {
        return fieldValue();
      },
      get isDirty() {
        return isDirty();
      },
      get errors() {
        return errors();
      },
      get isDisabled() {
        return formState.disabled;
      },
    },
    {
      setValue,
      handleBlur,
      handleChange,
      handleValidate,
    },
  ] as const;
}
