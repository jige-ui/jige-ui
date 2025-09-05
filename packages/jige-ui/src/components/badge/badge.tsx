import css from 'sass:./badge.scss';
import { type ComponentProps, splitProps } from 'solid-js';
import { mountStyle } from 'solid-tiny-utils';

export type BadgeVariant =
  | 'primary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'outline';

export function Badge(
  props: {
    class?: string;
    variant?: BadgeVariant;
  } & ComponentProps<'span'>
) {
  mountStyle(css, 'jige-ui-badge');
  const [localProps, others] = splitProps(props, ['class', 'variant']);

  return (
    <span
      class={['jg-badge', localProps.class].join(' ')}
      data-variant={localProps.variant || 'primary'}
      {...others}
    />
  );
}
