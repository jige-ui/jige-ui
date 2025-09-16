import { createUniqueId } from "solid-js";
import { context } from "./context";
import type { ToastFactory, ToastInst } from "./types";

export function useToast(): ToastFactory {
  const [, actions] = context.useContext();
  function createInst(inst: Omit<ToastInst, "id">) {
    actions.addInst({
      ...inst,
      id: createUniqueId(),
    });
  }
  const toast: ToastFactory = {} as ToastFactory;
  const keys = ["error", "success", "warning", "info"] as const;

  for (const type of keys) {
    toast[type] = (contentOrConf: string | Omit<ToastInst, "id" | "type">) => {
      if (typeof contentOrConf === "string") {
        createInst({
          type,
          content: contentOrConf,
          title: type,
        });
      } else {
        createInst({
          type,
          ...contentOrConf,
        });
      }
    };
  }

  return toast;
}

export { Provider as JigeToastProvider } from "./provider";

export * from "./types";
