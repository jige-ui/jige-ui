import { context } from "./context";
import { Control } from "./control";
import { Native } from "./native";
import { Root } from "./root";

export const RadioCore = Object.assign(Root, {
  Native,
  Control,
  useContext: context.useContext,
});
