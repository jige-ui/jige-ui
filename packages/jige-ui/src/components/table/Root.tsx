import { dataIf, TableCore } from 'jige-core'
import { context } from './context'
import { splitProps, type ComponentProps } from 'solid-js'
import { Spin } from '../spin'
import css from 'sass:./table.scss'
import { mountStyle } from 'jige-utils'

export function Root(
  props: ComponentProps<'div'> & {
    height?: string
    maxHeight?: string
    bordered?: boolean
    loading?: boolean
  },
) {
  mountStyle(css, 'jige-ui-table')

  const [localProps, others] = splitProps(props, ['height', 'maxHeight', 'bordered', 'loading'])
  const Context = context.initial({
    height: () => localProps.height,
    maxHeight: () => localProps.maxHeight,
  })

  return (
    <Context.Provider>
      <Spin spinning={localProps.loading}>
        <div
          class='jg-table'
          style={{
            'border-color': localProps.bordered ? 'var(--jg-t-border)' : 'transparent',
          }}
          data-bordered={dataIf(localProps.bordered)}
        >
          <TableCore {...others} />
        </div>
      </Spin>
    </Context.Provider>
  )
}
