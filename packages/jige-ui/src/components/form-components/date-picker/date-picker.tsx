import { undefinedOr } from "jige-core";
import { onCleanup, onMount } from "solid-js";
import { dayes } from "~/common/dayes";
import type { MaybePromise } from "~/common/types";
import { Button } from "~/components/button";
import { IconFluentCheckmark24Regular } from "~/components/icons/fluent-checkmark-24-regular";
import { IconFluentDismiss24Regular } from "~/components/icons/fluent-dismiss-24-regular";
import { TimePicker } from "../time-picker";
import { context } from "./context";
import { MainPanel } from "./main-panel";
import { Root } from "./root";
import { Trigger } from "./trigger";
import type { DatePickerType, DateTypes } from "./types";
import { Wrapper } from "./wrapper";

function WrapperMainPanel(props: {
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
  cellClass: string | ((day: DateTypes) => string);
}) {
  const [state, actions] = context.useContext();

  onMount(() => {
    actions.setState("previewMode", true);
  });

  onCleanup(() => {
    actions.setState("previewMode", false);
  });

  return (
    <div>
      <MainPanel
        currMonth={state.currMonth}
        currYear={state.currYear}
        dateRange={state.dateRange}
        disabled={state.disabled}
        headerRight={
          state.isDateTime
            ? () => (
                <TimePicker
                  onChange={(v) => {
                    if (v === state.timeValue) {
                      return;
                    }
                    actions.setState("timeValue", v);
                  }}
                  size="small"
                  type={state.type as any}
                  value={state.timeValue}
                />
              )
            : undefined
        }
        multiple={false}
        onChange={(v) => {
          if (v[0] === state.dateValue) {
            return;
          }
          if (state.type === "month") {
            actions.setState("dateValue", dayes(v[0]).format("YYYY-MM"));
            return;
          }
          actions.setState("dateValue", v[0]);
        }}
        type={state.type as any}
        value={[state.dateValue]}
        width={256}
        {...props}
      />
      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
          padding: "4px",
          "border-top": "1px solid var(--jg-t-border)",
        }}
      >
        <Button
          icon={<IconFluentCheckmark24Regular />}
          onClick={() => {
            actions.syncPreviewToValue();
            state.triggerRef?.blur();
          }}
          size={30}
          style={{ width: "100%", "flex-shrink": 1 }}
          variant="text"
        />
        <Button
          icon={<IconFluentDismiss24Regular />}
          onClick={() => {
            state.triggerRef?.blur();
          }}
          size={30}
          style={{ width: "100%", "flex-shrink": 1 }}
          variant="text"
        />
      </div>
    </div>
  );
}

export function DatePicker(props: {
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  placeholder?: string;
  type?: DatePickerType;
  clearable?: boolean;
  dateRange?: [DateTypes, DateTypes];
  cellClass?: string | ((day: DateTypes) => string);
  highlightYears?:
    | number[]
    | ((visibleYearRange: [number, number]) => MaybePromise<number[]>);
  highlightMonths?:
    | string[]
    | ((visibleYear: number) => MaybePromise<string[]>);
  highlightDates?:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[]
      ) => MaybePromise<DateTypes[]>);
  disabledDates?:
    | DateTypes[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[]
      ) => MaybePromise<DateTypes[]>);
}) {
  return (
    <Root
      dateRange={props.dateRange}
      disabled={props.disabled}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onFocus={props.onFocus}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value}
    >
      <Trigger
        clearable={undefinedOr(props.clearable, true)}
        size={props.size || "medium"}
      />
      <Wrapper>
        <WrapperMainPanel
          cellClass={props.cellClass || ""}
          disabledDates={props.disabledDates || []}
          highlightDates={props.highlightDates || []}
          highlightMonths={props.highlightMonths || []}
          highlightYears={props.highlightYears || []}
        />
      </Wrapper>
    </Root>
  );
}
