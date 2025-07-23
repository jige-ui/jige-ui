import { Close } from './Close'
import { Content } from './Content'
import { Footer } from './Footer'
import { Header } from './Header'
import { InnerContent } from './InnerContent'
import { Root } from './Root'
import { Trigger } from './Trigger'

export const Drawer = Object.assign(Root, {
  Content,
  Trigger,
  Close,
  Header,
  Footer,
  InnerContent,
})
