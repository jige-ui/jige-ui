import { Content } from './content';
import { context } from './context';
import { Handler } from './handler';
import { Root } from './root';

export * from './types';

export const DraggableCore = Object.assign(Root, {
  Handler,
  Content,
  useContext: context.useContext,
});
