import { createSignal, Show } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import { IconFluentMoreHorizontal24Filled } from "~/components/icons/fluent-more-horizontal-24-filled";
import { context } from "./context";

export function LoadingIcon() {
  const [state] = context.useContext();

  const [show, setShow] = createSignal(false);

  let timer: ReturnType<typeof setTimeout>;

  createWatch(
    () => state.loading,
    (v) => {
      if (v) {
        timer = setTimeout(() => {
          setShow(true);
        }, 100);
      } else {
        clearTimeout(timer);
        setShow(false);
      }
    }
  );

  return (
    <Show when={show()}>
      <div class="jg-btn-loading">
        <IconFluentMoreHorizontal24Filled />
      </div>
    </Show>
  );
}
