export interface DialogInst {
  id: string
  title: string
  type: 'success' | 'warning' | 'error'
  content: string
  positiveText?: string
  negativeText?: string
  onPositiveClick?: () => void | Promise<void>
  onNegativeClick?: () => void | Promise<void>
}
