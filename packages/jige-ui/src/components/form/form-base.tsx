import css from 'sass:./form.scss';
import { FormCore } from 'jige-core';
import { splitProps } from 'solid-js';

import { mountStyle } from 'solid-tiny-utils';
import { formContext } from './context';

export function FormBase(
  props: Parameters<typeof FormCore>[0] & {
    disabled?: boolean;
  }
) {
  mountStyle(css, 'jige-ui-form');
  const [localProps, otherProps] = splitProps(props, ['disabled']);
  const Context = formContext.initial({
    disabled: () => localProps.disabled,
  });
  return (
    <Context.Provider>
      <FormCore {...otherProps} />
    </Context.Provider>
  );
}
