import context from "./context";
import { Fill } from "./fill";
import { Rail } from "./rail";
import { Root } from "./root";

export const CircleProgressCore = Object.assign(Root, {
  Rail,
  Fill,
  useContext: context.useContext,
});
