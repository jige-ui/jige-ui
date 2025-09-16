import { Content } from "./content";
import context from "./context";
import { Root } from "./root";
import { Trigger } from "./trigger";

export const CollapsibleCore = Object.assign(Root, {
  Content,
  Trigger,
  useContext: context.useContext,
});
