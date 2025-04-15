import type { JSX } from 'solid-js/jsx-runtime'

export type DataTableSize = 'small' | 'medium' | 'large' | number

export type SimpleType = string | number | boolean | null | undefined
type RecordType = { [key: string]: SimpleType }
export interface DataTableProps<Record extends RecordType = RecordType> {
  dataSource: (Record | { [key: string]: Record })[]
  columns: DataTableColumn<Record>[]
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
}

export type DataTableColumn<T extends RecordType = RecordType> = {
  title: string
  key: string
  isParentColumn?: boolean
  hidden?: boolean
  width?: number
  render?: (value: T[string], record: T, index: number) => JSX.Element
}
