import { batch } from 'solid-js';
import type { createForm } from '../form';
import type { FieldValues } from '../types/field';
import type { FieldArrayPath } from '../types/path';

export function arrayRemove<TFieldValues extends FieldValues>(
  form: ReturnType<typeof createForm>,
  arrayPathName: FieldArrayPath<TFieldValues>,
  options: {
    at?: number;
  }
) {
  const [, formActs] = form.context;

  batch(() => {
    formActs.setFieldValue(arrayPathName, (prev: any[]) => {
      const { at = prev.length } = options;
      const nextItems = [...prev];
      nextItems.splice(at, 1);
      return nextItems;
    });
  });
}
