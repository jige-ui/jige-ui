import context from "./context";
import { Native } from "./native";
import { Root } from "./root";

export const InputCore = Object.assign(Root, {
  Native,
  useContext: context.useContext,
});

export * from "./types";
