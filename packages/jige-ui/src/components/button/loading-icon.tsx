import { Show } from "solid-js";
import { IconFluentMoreHorizontal24Filled } from "~/components/icons/fluent-more-horizontal-24-filled";
import { context } from "./context";

export function LoadingIcon() {
  const [state] = context.useContext();
  return (
    <Show when={state.loading}>
      <div class="jg-btn-loading">
        <IconFluentMoreHorizontal24Filled />
      </div>
    </Show>
  );
}
