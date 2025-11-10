import { throttle } from "@solid-primitives/scheduled";
import { type JSX, Show } from "solid-js";
import { Button } from "~/components/button";
import { IconFluentCaretDown24Filled } from "~/components/icons/fluent-caret-down-24-filled";
import { IconFluentCaretUp24Filled } from "~/components/icons/fluent-caret-up-24-filled";
import { NumberToChinese } from "../utils";
import { panelContext } from "./context";

export function HeadTools(props: {
  headerRight?: (
    state: ReturnType<typeof panelContext.useContext>[0],
    actions: ReturnType<typeof panelContext.useContext>[1]
  ) => JSX.Element;
}) {
  const [state, actions] = panelContext.useContext();
  const throttleMonth = throttle((e: WheelEvent) => {
    actions.monthHandle(e.deltaY > 0 ? 1 : -1);
  }, 60);
  const throttleYear = throttle((e: WheelEvent) => {
    actions.setCurrYear(e.deltaY > 0 ? state.currYear + 1 : state.currYear - 1);
  }, 60);

  return (
    <div class="jg-dp-head-tools">
      <div>
        <Button
          label={`${state.currYear}年`}
          onClick={() => {
            actions.setState(
              "activePanel",
              state.activePanel === "year" ? state.defaultPanel : "year"
            );
          }}
          onWheel={(e) => {
            e.preventDefault();
            throttleYear(e);
          }}
          size={26}
          style={{ "font-size": "15px", padding: "0 4px" }}
          variant="text"
        />
        <Button
          onClick={() => {
            actions.setState(
              "activePanel",
              state.activePanel === "month" ? state.defaultPanel : "month"
            );
          }}
          onWheel={(e) => {
            e.preventDefault();
            throttleMonth(e);
          }}
          size={26}
          style={{ "font-size": "14px", padding: "0 4px" }}
          variant="text"
        >
          {NumberToChinese(state.currMonth)}月
        </Button>
      </div>
      <div class="jg-dp-head-tools-caret">
        <Show
          fallback={props.headerRight!(state, actions)}
          when={!props.headerRight}
        >
          <Button
            icon={<IconFluentCaretUp24Filled />}
            onClick={() => {
              actions.monthHandle(1);
            }}
            style={{ "font-size": "12px" }}
            variant="text"
          />
          <Button
            icon={<IconFluentCaretDown24Filled />}
            onClick={() => {
              actions.monthHandle(-1);
            }}
            style={{ "font-size": "12px" }}
            variant="text"
          />
        </Show>
      </div>
    </div>
  );
}
