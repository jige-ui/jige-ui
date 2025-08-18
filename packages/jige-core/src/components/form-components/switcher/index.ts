import context from './context';
import Native from './native';
import { Control, Root } from './root';

export const SwitcherCore = Object.assign(Root, {
  Control,
  Native,
  useContext: context.useContext,
});
