import { debounce } from "@solid-primitives/scheduled";
import { For } from "solid-js";
import { createWatch, isFn, list } from "solid-tiny-utils";
import { endOfMonth, getMonth, getYear, startOfMonth } from "time-core";
import { dataIf } from "~/common/dataset";
import type { MaybePromise } from "~/common/types";
import { NumberToChinese, pad } from "../utils";
import { panelContext } from "./context";

export function MonthPanel(props: {
  highlightMonths: string[] | ((visibleYear: number) => MaybePromise<string[]>);
}) {
  const [state, actions] = panelContext.useContext();
  const debounceSetHlMonths = debounce(async (y: number) => {
    const getHls = props.highlightMonths;
    if (isFn(getHls)) {
      const mons = await getHls(y);
      actions.setState("hlMonths", mons);
    } else {
      actions.setState("hlMonths", getHls);
    }
  }, 200);

  const isHl = (m: number) => {
    return state.hlMonths.includes(`${state.currYear}-${pad(m)}`);
  };

  const checkMonth = (month: number) => {
    const date = `${state.currYear}-${pad(month)}-01`;

    return (
      actions.isInDateRange(startOfMonth(date)) ||
      actions.isInDateRange(endOfMonth(date))
    );
  };

  createWatch(() => state.currYear, debounceSetHlMonths);
  return (
    <div class="jg-dp-month-panel">
      <For each={list(1, 12)}>
        {(month) => {
          return (
            <div
              class="jg-dp-month-panel-month"
              classList={{
                "jg-dp-month-panel-month-hl": isHl(month),
              }}
              data-disabled={dataIf(!checkMonth(month))}
              data-selected={dataIf(
                getMonth(state.value[0]) === month &&
                  getYear(state.value[0]) === state.currYear
              )}
              onClick={() => {
                if (!checkMonth(month)) {
                  return;
                }
                actions.setCurrMonth(month);
                actions.setActivePanel(state.defaultPanel);
              }}
              onKeyDown={() => {}}
            >
              {NumberToChinese(month)}月
            </div>
          );
        }}
      </For>
    </div>
  );
}
