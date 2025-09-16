import { debounce, throttle } from "@solid-primitives/scheduled";
import { createSignal, For } from "solid-js";
import { createWatch, isArray } from "solid-tiny-utils";
import { dataIf } from "~/common/dataset";
import { dayes } from "~/common/dayes";
import type { MaybePromise } from "~/common/types";
import { genYears } from "../utils";
import { panelContext } from "./context";

export function YearPanel(props: {
  highlightYears:
    | number[]
    | ((visibleYearRange: [number, number]) => MaybePromise<number[]>);
}) {
  const [state, actions] = panelContext.useContext();
  const [years, setYears] = createSignal<number[]>(genYears(state.currYear));
  // eslint-disable-next-line solid/reactivity
  const throttleYear = throttle((e: WheelEvent) => {
    const maxYear = state.toInst.year();
    const minYear = state.fromInst.year();
    const firstYear = years()[0];
    const lastYear = years()[years().length - 1];

    if (e.deltaY > 0 && lastYear < maxYear) {
      setYears(genYears(lastYear + 12));
    } else if (e.deltaY < 0 && firstYear > minYear) {
      setYears(genYears(firstYear - 12));
    }
  }, 60);

  const debounceSetHlYears = debounce(async (ys: number[]) => {
    const getHls = props.highlightYears;
    if (isArray(getHls)) {
      actions.setState("hlYears", getHls);
    } else {
      const hlYears = await getHls([ys[0], ys.at(-1)!]);
      actions.setState("hlYears", hlYears);
    }
  }, 200);

  const checkYear = (year: number) => {
    return year >= state.fromInst.year() && year <= state.toInst.year();
  };

  createWatch(years, debounceSetHlYears);
  return (
    <div
      class="jg-dp-year-panel"
      onWheel={(e) => {
        e.preventDefault();
        throttleYear(e);
      }}
    >
      <For each={years()}>
        {(year) => (
          <div
            class="jg-dp-year-panel-year"
            classList={{
              "jg-dp-year-panel-year-hl": state.hlYears.includes(year),
            }}
            data-disabled={dataIf(!checkYear(year))}
            data-selected={dataIf(dayes(state.value).year() === year)}
            onClick={() => {
              if (!checkYear(year)) {
                return;
              }
              actions.setCurrYear(year);
              actions.setActivePanel(state.defaultPanel);
            }}
            onKeyDown={() => {}}
          >
            {year}
          </div>
        )}
      </For>
    </div>
  );
}
