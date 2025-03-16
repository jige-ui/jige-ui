import { Bind } from './Bind'
import { Field } from './Field'
import { FormBase as F } from './FormBase'
import { fieldContext, formContext } from './context'

export const Form = Object.assign(F, {
  Bind,
  Field,
  useFieldContext: fieldContext.useContext,
  useFormContext: formContext.useContext,
})
