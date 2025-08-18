import { Arrow } from './arrow';
import { Content } from './content';
import { context } from './context';
import { Root } from './root';
import { Trigger } from './trigger';

export const FloatingUiCore = Object.assign(Root, {
  Trigger,
  Content,
  Arrow,
  useContext: context.useContext,
});

export * from './props';
