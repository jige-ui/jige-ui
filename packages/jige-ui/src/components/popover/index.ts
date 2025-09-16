import { FloatingUiCore } from "jige-core";
import { Content } from "./content";
import { Root } from "./root";

export const Popover = Object.assign(Root, {
  Content,
  Trigger: FloatingUiCore.Trigger,
});
