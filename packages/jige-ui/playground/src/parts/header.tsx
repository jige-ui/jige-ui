import { Show } from "solid-js";
import { Button, JigeRootContext, Popover, Slider } from "~/build";
import { useAppState } from "../state/app-state";

export function Header() {
  const [state, actions] = useAppState();
  const [jigeUiState, jigeUiActions] = JigeRootContext.useContext();
  return (
    <div class="flex h-full items-center justify-between">
      <div class="flex">
        <span class="ml-2 font-bold text-2xl">Jige UI</span>
      </div>
      <div class="mx-2 flex gap-1 text-xl">
        <Button
          icon={
            <Show
              fallback={<div class="i-fluent:weather-sunny-24-regular" />}
              when={!state.isDark}
            >
              <div class="i-fluent:weather-moon-24-filled" />
            </Show>
          }
          onClick={() => {
            actions.setState("isDark", !state.isDark);
          }}
          variant="text"
        />
        <Popover placement="bottom-end">
          <Popover.Trigger>
            <Button
              icon={<div class="i-fluent:color-24-regular" />}
              variant="text"
            />
          </Popover.Trigger>
          <Popover.Content arrow>
            <div class="p-2">
              <Slider
                max={360}
                min={0}
                onChange={jigeUiActions.setHue}
                step={5}
                value={jigeUiState.hue}
              />
            </div>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
}
