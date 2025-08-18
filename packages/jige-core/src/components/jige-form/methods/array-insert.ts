import { batch } from 'solid-js';
import type { createForm } from '../form';
import type { FieldValues } from '../types/field';
import type { FieldArrayPath, FieldArrayPathValue } from '../types/path';

export function arrayInsert<TFieldValues extends FieldValues>(
  form: ReturnType<typeof createForm>,
  arrayPathName: FieldArrayPath<TFieldValues>,
  options: {
    at?: number;
    value: FieldArrayPathValue<
      TFieldValues,
      FieldArrayPath<TFieldValues>
    >[number] extends never
      ? any
      : FieldArrayPathValue<TFieldValues, FieldArrayPath<TFieldValues>>[number];
  }
) {
  const [, formActs] = form.context;

  batch(() => {
    formActs.setFieldValue(arrayPathName, (prev: any[]) => {
      const { at = prev.length, value } = options;
      const nextItems = [...prev];
      nextItems.splice(at, 0, value);

      return nextItems;
    });
  });
}
