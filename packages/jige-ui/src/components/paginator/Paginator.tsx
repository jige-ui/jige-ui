import { PaginatorCore } from 'jige-core'
import { isNumber } from 'radash'
import css from 'sass:./paginator.scss'

import { createMemo, createSignal, Match, Show, Switch } from 'solid-js'
import { mountStyle } from 'solid-uses'
import { setData } from '~/common/dataset'
import { isDef } from '~/common/types'
import { DoubleArrowLeft, DoubleArrowRight, IconThreeDots } from '../icons'

function Pager(props: {
  page: number
  currPage: number
  onPageClick: (page: number) => void
}) {
  const isCurrent = createMemo(() => props.page === props.currPage)
  return (
    <div
      class="jg-paginator-pager"
      {...setData('checked', isCurrent())}
      onClick={() => { !isCurrent() && props.onPageClick(props.page) }}
    >
      {props.page}
    </div>
  )
}

function PagerBlank(props: { onPageClick: (page: number) => void, left: boolean, currPage: number }) {
  const [isHover, setIsHover] = createSignal(false)

  return (
    <div
      class="jg-paginator-pager-blank"
      onClick={() => {
        props.onPageClick(props.left ? props.currPage - 2 : props.currPage + 2)
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Switch>
        <Match when={isHover()}>
          <Show when={props.left} fallback={<DoubleArrowRight />}>
            <DoubleArrowLeft />
          </Show>
        </Match>
        <Match when={!isHover()}>
          <IconThreeDots />
        </Match>
      </Switch>
    </div>
  )
}

export function Paginator(props: {
  currPage: number
  total?: number
  pageSize?: number
  totalPage?: number
  onPageClick: (page: number) => void
  hideOnSinglePage?: boolean
  disabled?: boolean
}) {
  mountStyle(css, 'jige-ui-paginator')
  const shouldHide = createMemo(() => {
    const total = props.total
    const pageSize = props.pageSize
    const totalPage = props.totalPage

    if (isDef(totalPage)) {
      return totalPage <= 1
    }

    if (isDef(total) && isDef(pageSize)) {
      return total < pageSize
    }

    return true
  })
  return (
    <div
      class="jg-paginator"
      style={{
        'opacity': shouldHide() ? 0 : props.disabled ? 0.6 : 1,
        'pointer-events': props.disabled ? 'none' : 'auto',
      }}
    >
      <PaginatorCore {...props}>
        <PaginatorCore.Pager>
          {(page) => {
            return (
              <Show
                when={isNumber(page)}
                fallback={(
                  <PagerBlank
                    onPageClick={props.onPageClick}
                    left={page === 'space-left'}
                    currPage={props.currPage}
                  />
                )}
              >
                <Pager page={page as number} {...props} />
              </Show>
            )
          }}
        </PaginatorCore.Pager>
      </PaginatorCore>
    </div>
  )
}
