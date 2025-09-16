import { debounce } from "@solid-primitives/scheduled";
import type { EsDay } from "esday";
import { createMemo, createSignal, For } from "solid-js";
import { createWatch, isFn, list } from "solid-tiny-utils";
import { dataIf } from "~/common/dataset";
import { dayes } from "~/common/dayes";
import type { MaybePromise } from "~/common/types";
import type { DateTypes } from "../types";
import { genCalendarDays, NumberToChinese } from "../utils";
import { panelContext } from "./context";

export function DayPanel(props: {
  cellClass: string | ((day: EsDay) => string);
  highlightDates:
    | DateTypes[]
    | ((
        year: number,
        month: number,
        dates: string[]
      ) => MaybePromise<DateTypes[]>);
  disabledDates:
    | DateTypes[]
    | ((
        year: number,
        month: number,
        dates: string[]
      ) => MaybePromise<DateTypes[]>);
}) {
  const [state, actions] = panelContext.useContext();
  const dates = createMemo(() =>
    genCalendarDays(state.currYear, state.currMonth)
  );

  // eslint-disable-next-line solid/reactivity
  const debounceSetHlDates = debounce(async (y: number, m: number) => {
    const getHls = props.highlightDates;
    if (isFn(getHls)) {
      const highlightDates = await getHls(
        y,
        m,
        dates().map((d) => d.format("YYYY-MM-DD"))
      );
      if (y === state.currYear && m === state.currMonth) {
        actions.setState(
          "hlDates",
          highlightDates.map((d) => dayes(d).format("YYYY-MM-DD"))
        );
      }
    } else {
      actions.setState(
        "hlDates",
        getHls.map((d) => dayes(d).format("YYYY-MM-DD"))
      );
    }
  }, 200);

  const [isLoadingDsDates, setIsLoadingDsDates] = createSignal(false);
  // eslint-disable-next-line solid/reactivity
  const debounceSetDsDates = debounce(async (y: number, m: number) => {
    const getDs = props.disabledDates;
    if (isFn(getDs)) {
      setIsLoadingDsDates(true);
      const disabledDates = await getDs(
        y,
        m,
        dates().map((d) => d.format("YYYY-MM-DD"))
      );
      if (y === state.currYear && m === state.currMonth) {
        actions.setState(
          "dsDates",
          disabledDates.map((d) => dayes(d).format("YYYY-MM-DD"))
        );
      }
      setIsLoadingDsDates(false);
    } else {
      actions.setState(
        "dsDates",
        getDs.map((d) => dayes(d).format("YYYY-MM-DD"))
      );
    }
  }, 200);

  createWatch([() => state.currYear, () => state.currMonth], ([y, m]) => {
    debounceSetHlDates(y, m);
    debounceSetDsDates(y, m);
  });

  createWatch(
    () => props.highlightDates,
    () => {
      debounceSetHlDates(state.currYear, state.currMonth);
    }
  );

  createWatch(
    () => props.disabledDates,
    () => {
      debounceSetDsDates(state.currYear, state.currMonth);
    }
  );

  const isDsDay = (day: EsDay) => {
    return (
      !actions.isInDateRange(day) ||
      state.dsDates.includes(day.format("YYYY-MM-DD")) ||
      isLoadingDsDates()
    );
  };

  const cellClass = (day: EsDay) => {
    const classList = ["jg-dp-day-panel-cell"];
    if (day.isToday()) {
      classList.push("jg-dp-is-today");
    }
    if (day.month() !== state.currMonth) {
      classList.push("jg-dp-is-not-curr-month");
    }
    if (
      state.hlDates.includes(day.format("YYYY-MM-DD")) &&
      !day.isSame(state.value, "day")
    ) {
      classList.push("jg-dp-day-panel-day-hl");
    }

    if (isFn(props.cellClass)) {
      const cls = props.cellClass(day);
      if (cls) {
        classList.push(cls);
      }
    } else {
      classList.push(props.cellClass);
    }

    return classList.join(" ");
  };
  return (
    <div class="jg-dp-day-panel">
      <For each={list(6)}>
        {(i) => <div class="jg-dp-day-panel-week">{NumberToChinese(i)}</div>}
      </For>
      <For each={dates()}>
        {(day) => (
          <div
            class={cellClass(day)}
            data-disabled={dataIf(isDsDay(day))}
            data-selected={dataIf(
              state.value.includes(day.format("YYYY-MM-DD")) &&
                day.month() === state.currMonth
            )}
          >
            <div
              class="jg-dp-day-panel-day"
              onClick={() => {
                if (state.multiple) {
                  if (day.isSame(state.value, "day")) {
                    actions.setValue(
                      state.value
                        .filter((d) => !day.isSame(dayes(d), "day"))
                        .map((d) => d)
                    );
                  } else {
                    actions.setValue([
                      ...state.value,
                      day.format("YYYY-MM-DD"),
                    ]);
                  }
                } else {
                  actions.setValue([day.format("YYYY-MM-DD")]);
                }
              }}
              onKeyDown={() => {}}
              title={day.format("YYYY-MM-DD")}
            >
              {day.date()}
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
