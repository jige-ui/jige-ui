import { createContext } from 'solid-js';
import { createComponentState } from 'solid-tiny-context';

export const fieldNameContext = createComponentState({
  state: () => ({
    name: '',
  }),
  methods: {
    setName(name: string) {
      this.actions.setState('name', name);
    },
  },
});

export const FieldContext = createContext<
  readonly [
    {
      name: string;
      isTouched: boolean;
      isValidating: boolean;
      value: any;
      isDirty: boolean;
      errors: any[];
      isDisabled: boolean;
    },
    {
      setValue: (value: unknown) => boolean;
      handleBlur: () => void;
      handleChange: (value: any) => void;
      handleValidate: () => void;
    },
  ]
>([
  {
    name: '',
    isTouched: false,
    isValidating: false,
    value: undefined,
    isDirty: false,
    errors: [] as any[],
    isDisabled: false,
  },
  {
    setValue: (() => false) as (value: unknown) => boolean,
    handleBlur: () => {},
    handleChange: () => {},
    handleValidate: () => {},
  },
]);
