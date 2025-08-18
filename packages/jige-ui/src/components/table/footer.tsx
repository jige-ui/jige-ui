import { createElementBounds } from '@solid-primitives/bounds';
import { type ComponentProps, createSignal, splitProps } from 'solid-js';
import { createWatch } from 'solid-tiny-utils';
import { context } from './context';

export function Footer(props: ComponentProps<'div'>) {
  const [localProps, others] = splitProps(props, ['class']);
  const [, acts] = context.useContext();
  const [ref, setRef] = createSignal<HTMLDivElement | null>(null);
  const bounds = createElementBounds(ref);

  createWatch(
    () => bounds.height,
    (h) => {
      acts.setState('footerHeight', h || 0);
    }
  );

  return (
    <div
      class={['jg-table-footer', localProps.class].join(' ')}
      ref={setRef}
      {...others}
    />
  );
}
