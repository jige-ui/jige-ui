import { useContext } from 'solid-js';
import { JigeFieldArray, JigeFieldCore } from './field';
import { FieldContext } from './field/context';
import { JigeFormCore as Core, createForm } from './form';
import { formContext } from './form/context';
import {
  arrayInsert,
  arrayMove,
  arrayRemove,
  arrayReplace,
  arraySwap,
} from './methods';

const methods = {
  arrayInsert,
  arrayMove,
  arrayRemove,
  arrayReplace,
  arraySwap,
};

export const FormCore = Object.assign(Core, {
  Field: JigeFieldCore,
  FieldArray: JigeFieldArray,
  methods,
  createForm,
  useForm: formContext.useContext,
  useField: () => {
    return useContext(FieldContext);
  },
});
