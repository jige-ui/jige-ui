import { type ComponentProps, splitProps } from 'solid-js'

export function Footer(props: ComponentProps<'div'>) {
  const [localProps, others] = splitProps(props, ['class'])

  return <div class={['jg-table-footer', localProps.class].join(' ')} {...others} />
}
