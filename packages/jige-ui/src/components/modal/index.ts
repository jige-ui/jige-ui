import { Content } from "./content";
import { Footer } from "./footer";
import { Header } from "./header";
import { InnerContent } from "./inner-content";
import { Root } from "./root";
import { Trigger } from "./trigger";

export const Modal = Object.assign(Root, {
  Content,
  Trigger,
  Header,
  Footer,
  InnerContent,
});
