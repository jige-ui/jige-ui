import css from 'sass:./form.scss';
import { FormCore } from 'jige-core';
import { mountStyle } from 'solid-tiny-utils';

export function FormBase(
  props: Parameters<typeof FormCore>[0] & {
    disabled?: boolean;
  }
) {
  mountStyle(css, 'jige-ui-form');

  return <FormCore {...props} />;
}
