import context from './context';
import { Panel } from './panel';
import { Root } from './root';

export const AnimatedGroup = Object.assign(Root, {
  Panel,
  useContext: context.useContext,
});
