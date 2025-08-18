import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { runSolidEventHandler } from '@/common/solidjs';
import type { createForm } from './create-form';

export function JigeFormCore<T extends {}>(
  props: {
    staticFormInstance: ReturnType<typeof createForm<T>>;
  } & JSX.FormHTMLAttributes<HTMLFormElement>
) {
  const [localProps, otherProps] = splitProps(props, [
    'staticFormInstance',
    'onSubmit',
    'onReset',
  ]);
  const [, actions] = localProps.staticFormInstance.context;

  return (
    <localProps.staticFormInstance.Provider>
      <form
        {...otherProps}
        onReset={(e) => {
          e.preventDefault();
          e.stopPropagation();
          actions.handleReset();
          runSolidEventHandler(e, localProps.onReset);
        }}
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          actions.handleSubmit();
          runSolidEventHandler(e, localProps.onSubmit);
        }}
      >
        {props.children}
      </form>
    </localProps.staticFormInstance.Provider>
  );
}
