import type { JSX } from 'solid-js/jsx-runtime'
import type { FlattenObject } from '~/common/flatObject'
import type { Keys } from '~/common/types'

export type DataTableSize = 'small' | 'medium' | 'large' | number

export type SimpleType = string | number | boolean | null | undefined
type RecordType = { [key: string]: SimpleType }
export interface DataTableProps<
  T extends RecordType | { [key: string]: RecordType },
  K extends string,
> {
  dataSource: T[]
  columns: DataTableColumn<FlattenObject<T>, K>[]
  /**
   * default: medium
   */
  size?: DataTableSize
  bordered?: boolean
  loading?: boolean
  height?: string
  maxHeight?: string
  pagination?: {
    total: number
    pageSize: number
    onPageClick: (page: number) => void
    currPage: number
  }
  footer?: JSX.Element
}

export type DataTableColumn<T extends Record<string, any>, K extends string> = {
  title: string
  key: K
  isParentColumn?: boolean
  hidden?: boolean
  width?: number
  render?: (value: K extends Keys<T> ? T[K] : undefined, record: T, index: number) => JSX.Element
}
