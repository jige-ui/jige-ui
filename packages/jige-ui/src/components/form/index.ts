import { fieldContext, formContext } from './context';
import { Field } from './field';
import { FormBase as F } from './form-base';

export const Form = Object.assign(F, {
  Field,
  useFieldContext: fieldContext.useContext,
  useFormContext: formContext.useContext,
});

export * from './components';
