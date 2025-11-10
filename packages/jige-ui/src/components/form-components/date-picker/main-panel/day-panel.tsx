import { debounce } from "@solid-primitives/scheduled";
import { createMemo, createSignal, For } from "solid-js";
import { createWatch, isFn, list } from "solid-tiny-utils";
import {
  type DateArgs,
  formatToDateTime,
  getDay,
  getMonth,
  isSameDate,
  isToday,
} from "time-core";
import { dataIf } from "~/common/dataset";
import type { MaybePromise } from "~/common/types";
import { formatToDateStr, genCalendarDays, NumberToChinese } from "../utils";
import { panelContext } from "./context";

export function DayPanel(props: {
  cellClass: string | ((date: string) => string);
  highlightDates:
    | DateArgs[]
    | ((
        year: number,
        month: number,
        dates: string[]
      ) => MaybePromise<DateArgs[]>);
  disabledDates:
    | DateArgs[]
    | ((
        year: number,
        month: number,
        dates: string[]
      ) => MaybePromise<DateArgs[]>);
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
        dates().map((d) => formatToDateTime(d).split(" ")[0])
      );
      if (y === state.currYear && m === state.currMonth) {
        actions.setState(
          "hlDates",
          highlightDates.map((d) => formatToDateTime(d).split(" ")[0])
        );
      }
    } else {
      actions.setState(
        "hlDates",
        getHls.map((d) => formatToDateTime(d).split(" ")[0])
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
        dates().map((d) => formatToDateTime(d).split(" ")[0])
      );
      if (y === state.currYear && m === state.currMonth) {
        actions.setState(
          "dsDates",
          disabledDates.map((d) => formatToDateTime(d).split(" ")[0])
        );
      }
      setIsLoadingDsDates(false);
    } else {
      actions.setState(
        "dsDates",
        getDs.map((d) => formatToDateTime(d).split(" ")[0])
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

  const isDsDay = (day: string) => {
    return (
      !actions.isInDateRange(day) ||
      state.dsDates.includes(day) ||
      isLoadingDsDates()
    );
  };

  const cellClass = (day: string) => {
    const classList = ["jg-dp-day-panel-cell"];
    if (isToday(day)) {
      classList.push("jg-dp-is-today");
    }
    if (getMonth(day) !== state.currMonth) {
      classList.push("jg-dp-is-not-curr-month");
    }
    if (
      state.hlDates.includes(formatToDateTime(day).split(" ")[0]) &&
      !isSameDate(state.value[0], "day")
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
            class={cellClass(formatToDateStr(day))}
            data-disabled={dataIf(isDsDay(formatToDateStr(day)))}
            data-selected={dataIf(
              state.value.includes(formatToDateStr(day)) &&
                getMonth(day) === state.currMonth
            )}
          >
            <div
              class="jg-dp-day-panel-day"
              onClick={() => {
                if (state.multiple) {
                  if (state.value.includes(formatToDateStr(day))) {
                    actions.setValue(
                      state.value.filter((d) => !isSameDate(d, day))
                    );
                  } else {
                    actions.setValue([...state.value, formatToDateStr(day)]);
                  }
                } else {
                  actions.setValue([formatToDateStr(day)]);
                }
              }}
              onKeyDown={() => {}}
              title={formatToDateStr(day)}
            >
              {getDay(day)}
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
