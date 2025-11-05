import { mergeRefs } from "@solid-primitives/refs";
import { createResizeObserver } from "@solid-primitives/resize-observer";
import {
  type ComponentProps,
  createSignal,
  onMount,
  splitProps,
} from "solid-js";
import { createWatch } from "solid-tiny-utils";
import context from "./context";

export default function Table(props: ComponentProps<"div">) {
  const Context = context.initial();
  const [local, others] = splitProps(props, ["ref"]);
  const [state, actions] = Context.value;
  const [ref, setRef] = createSignal<HTMLDivElement | null>(null);

  onMount(() => {
    createResizeObserver(ref, (_, el) => {
      const clientWidth = el.clientWidth;
      if (state.wrapperWidth === clientWidth) {
        return;
      }
      if (IS_DEV) {
        console.log("refresh by resize observer");
      }

      actions.setState("wrapperWidth", clientWidth);
      actions.refresh(clientWidth);
    });

    createWatch(
      [() => ({ ...state.manualWidths })],
      () => {
        const el = ref();
        if (!el?.clientWidth) {
          return;
        }

        if (IS_DEV) {
          console.log("refresh by manualWidths");
        }

        const clientWidth = el.clientWidth;
        actions.setState("wrapperWidth", clientWidth);
        actions.refresh(clientWidth);
      },
      { defer: true }
    );
  });

  return (
    <Context.Provider>
      <div ref={mergeRefs(local.ref, setRef)} {...others} />
    </Context.Provider>
  );
}
