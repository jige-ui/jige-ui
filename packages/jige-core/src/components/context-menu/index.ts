import { Content } from "./content";
import context from "./context";
import { Root } from "./root";
import { Trigger } from "./trigger";

export const ContextMenuCore = Object.assign(Root, {
  Trigger,
  Content,
  useContext: context.useContext,
});
