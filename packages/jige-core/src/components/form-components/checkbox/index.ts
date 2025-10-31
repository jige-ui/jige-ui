import { context } from "./context";
import { Control } from "./control";
import { Native } from "./native";
import { Root } from "./root";

export const CheckboxCore = Object.assign(Root, {
  Control,
  Native,
  useContext: context.useContext,
});
