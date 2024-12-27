import { CollapsibleCore } from 'jige-core'
import { Arrow1, Content, Root } from './Collapse'

export const Collapse = Object.assign(Root, {
  Arrow1,
  Trigger: CollapsibleCore.Trigger,
  Content,
})
