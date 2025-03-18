import { Bind } from './Bind'
import { Field } from './Field'
import { FormBase as F } from './FormBase'
import { fieldContext, formContext } from './context'

const createNativeComponentAttrs = () => {
  const [state] = fieldContext.useContext()
  return {
    id: state.labelFor,
    'aria-labelledby': state.hasLabel ? state.labelID : undefined,
    'aria-describedby': state.descriptionID,
  }
}

export const Form = Object.assign(F, {
  Bind,
  Field,
  useFieldContext: fieldContext.useContext,
  useFormContext: formContext.useContext,
  createNativeComponentAttrs,
})
