import context from "./context";
import Fill from "./fill";
import Native from "./native";
import Root from "./root";
import Thumb from "./thumb";
import Track from "./track";

export const SliderCore = Object.assign(Root, {
  Thumb,
  Fill,
  Track,
  Native,
  useContext: context.useContext,
});
