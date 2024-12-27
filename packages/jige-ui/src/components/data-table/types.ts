import type { DataType } from 'jige-core'

export interface DataTableProps {
  data: DataType[]
  loading?: boolean
  height?: string
  maxHeight?: string
}
