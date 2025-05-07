import type { FloatingUiCoreProps } from 'jige-core'
import { splitProps } from 'solid-js'
import { Popover } from '../popover'
import { Content } from './Content'
import type { PopConfirmProps } from './types'

export function PopConfirm(props: PopConfirmProps & FloatingUiCoreProps) {
  const [localProps, otherProps] = splitProps(props, [
    'title',
    'description',
    'onConfirm',
    'onCancel',
    'icon',
    'cancelText',
    'okText',
    'children',
  ])

  return (
    <Popover
      trigger='click'
      placement='top'
      floatingOption={{
        offset: 10,
      }}
      {...otherProps}
    >
      <Popover.Trigger>{localProps.children}</Popover.Trigger>
      <Popover.Content arrow={8} animation='ani-floating-ui-scale'>
        <Content
          title={localProps.title}
          description={localProps.description}
          icon={localProps.icon}
          cancelText={localProps.cancelText}
          okText={localProps.okText}
          onConfirm={localProps.onConfirm}
          onCancel={localProps.onCancel}
        />
      </Popover.Content>
    </Popover>
  )
}
