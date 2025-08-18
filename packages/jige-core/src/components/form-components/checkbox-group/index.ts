import context from './context';
import { Item, ItemControl, ItemNative } from './item';
import { Root } from './root';

export const CheckboxGroupCore = Object.assign(Root, {
  Item,
  ItemNative,
  ItemControl,
  useContext: context.useContext,
});
