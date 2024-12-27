import { FloatingUiCore } from 'jige-core'
import { Content } from './Content'
import { Root } from './Root'

export const Popover = Object.assign(Root, {
  Content,
  Trigger: FloatingUiCore.Trigger,
})
