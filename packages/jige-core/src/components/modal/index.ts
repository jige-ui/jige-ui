import { Content } from "./content";
import { context, GlobalModalStore } from "./context";
import { Mask } from "./mask";
import { Portal } from "./portal";
import { Root } from "./root";
import { Trigger } from "./trigger";

export const ModalCore = Object.assign(Root, {
  Trigger,
  Portal,
  Content,
  Mask,
  useContext: context.useContext,
  closeAll: () => {
    const [, setState] = GlobalModalStore;
    setState("closeAll", true);
    setState("closeAll", false);
  },
});
