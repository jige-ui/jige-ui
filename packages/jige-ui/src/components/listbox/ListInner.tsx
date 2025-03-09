import type { JSX } from 'solid-js'
import { CommonScrollWrapper } from './CommonScrollWrapper'

export function ListInner(props: {
  items: any[]
  rootHeight: number
  rowHeight: number
  fallback: JSX.Element
  children: (item: any, index: number) => JSX.Element
  onSelect: (item: any, index: number) => void
  selectIndex: number
  selectTrigger: 'click' | 'arrow'
  scrollToSelected: boolean
  class?: string
  itemClass?: string
}) {
  return (
    <CommonScrollWrapper
      {...props}
    />
  )
}
