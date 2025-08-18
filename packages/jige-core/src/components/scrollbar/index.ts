import Bar from './bar';
import Content from './content';
import context from './context';
import Root from './root';
import { ScrollArea } from './scroll-area';
import Thumb from './thumb';

export const ScrollbarCore = Object.assign(Root, {
  Content,
  Bar,
  Thumb,
  ScrollArea,
  useContext: context.useContext,
});
