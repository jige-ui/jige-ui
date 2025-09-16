import type { EsDay } from "esday";
import { AnimatedGroup } from "jige-core";
import { batch, type ComponentProps, createSignal } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import type { MaybePromise } from "~/common/types";
import type { DateTypes } from "../types";
import { panelContext } from "./context";
import { DayPanel } from "./day-panel";
import { HeadTools } from "./head-tools";
import { MonthPanel } from "./month-panel";
import { YearPanel } from "./year-panel";

function AnimatedPanel(props: {
  width: number;
  cellClass: string | ((day: EsDay) => string);
  highlightYears:
    | number[]
    | ((visibleYearRange: [number, number]) => MaybePromise<number[]>);
  highlightMonths: string[] | ((visibleYear: number) => MaybePromise<string[]>);
  highlightDates:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[]
      ) => MaybePromise<DateTypes[]>);
  disabledDates:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[]
      ) => MaybePromise<DateTypes[]>);
}) {
  const [state] = panelContext.useContext();
  const [className, setClassName] = createSignal("");

  createWatch(
    () => state.activePanel,
    () => {
      setClassName("jg-dp-animated-panel");
    },
    { defer: true }
  );

  return (
    <AnimatedGroup active={state.activePanel}>
      <div
        style={{
          width: `${props.width}px`,
        }}
      >
        <AnimatedGroup.Panel class={className()} key="day">
          <DayPanel
            cellClass={props.cellClass || ""}
            disabledDates={props.disabledDates || []}
            highlightDates={props.highlightDates || []}
          />
        </AnimatedGroup.Panel>
        <AnimatedGroup.Panel class={className()} key="month">
          <MonthPanel highlightMonths={props.highlightMonths || []} />
        </AnimatedGroup.Panel>
        <AnimatedGroup.Panel class={className()} key="year">
          <YearPanel highlightYears={props.highlightYears || []} />
        </AnimatedGroup.Panel>
      </div>
    </AnimatedGroup>
  );
}

export function MainPanel(props: {
  onCurrYearMonthChange?: (year: number, month: number) => void;
  headerRight?: ComponentProps<typeof HeadTools>["headerRight"];
  value: string[];
  width?: number;
  onChange: (value: string[]) => void;
  disabled: boolean;
  type: "date" | "month";
  currYear: number;
  currMonth: number;
  dateRange: [DateTypes, DateTypes];
  cellClass: string | ((day: EsDay) => string);
  highlightYears:
    | number[]
    | ((visibleYearRange: [number, number]) => MaybePromise<number[]>);
  highlightMonths: string[] | ((visibleYear: number) => MaybePromise<string[]>);
  multiple: boolean;
  highlightDates:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[]
      ) => MaybePromise<DateTypes[]>);
  disabledDates:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[]
      ) => MaybePromise<DateTypes[]>);
}) {
  const Context = panelContext.initial({
    value: () => props.value,
    dateRange: () => props.dateRange,
    disabled: () => props.disabled,
    currYear: () => props.currYear,
    type: () => props.type,
    multiple: () => props.multiple,
    activePanel: () => {
      switch (props.type) {
        case "month":
          return "month";
        default:
          return "day";
      }
    },
  });

  const [state, actions] = Context.value;

  createWatch(
    () => state.value,
    (v) => {
      props.onChange(v);
    }
  );

  createWatch(
    () => props.currMonth,
    (m) => {
      batch(() => {
        if (m > 11) {
          actions.setCurrMonth(0);
          actions.setCurrYear(state.currYear + 1);
        } else if (m < 0) {
          actions.setCurrMonth(11);
          actions.setCurrYear(state.currYear - 1);
        } else {
          actions.setCurrMonth(m);
        }
      });
    }
  );

  createWatch(
    () => [state.currYear, state.currMonth],
    ([y, m]) => {
      props.onCurrYearMonthChange?.(y, m);
    }
  );

  return (
    <Context.Provider>
      <div>
        <HeadTools headerRight={props.headerRight} />
        <AnimatedPanel
          cellClass={props.cellClass}
          disabledDates={props.disabledDates}
          highlightDates={props.highlightDates}
          highlightMonths={props.highlightMonths}
          highlightYears={props.highlightYears}
          width={props.width || 245}
        />
      </div>
    </Context.Provider>
  );
}
