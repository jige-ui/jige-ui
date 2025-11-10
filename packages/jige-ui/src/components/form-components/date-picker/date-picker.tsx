import { undefinedOr } from "jige-core";
import { onCleanup, onMount } from "solid-js";
import { type DateArgs, getTimestamp } from "time-core";
import type { MaybePromise } from "~/common/types";
import { Button } from "~/components/button";
import { IconFluentCheckmark24Regular } from "~/components/icons/fluent-checkmark-24-regular";
import { IconFluentDismiss24Regular } from "~/components/icons/fluent-dismiss-24-regular";
import { TimePicker } from "../time-picker";
import { context } from "./context";
import { MainPanel } from "./main-panel";
import { Root } from "./root";
import { Trigger } from "./trigger";
import type { DatePickerToValueFunc, DatePickerType } from "./types";
import { Wrapper } from "./wrapper";

function WrapperMainPanel(props: {
  highlightYears:
    | number[]
    | ((visibleYearRange: [number, number]) => MaybePromise<number[]>);
  highlightMonths: string[] | ((visibleYear: number) => MaybePromise<string[]>);
  highlightDates:
    | DateArgs[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[]
      ) => MaybePromise<DateArgs[]>);
  disabledDates:
    | DateArgs[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[]
      ) => MaybePromise<DateArgs[]>);
  cellClass: string | ((date: string) => string);
}) {
  const [state, actions] = context.useContext();

  onMount(() => {
    actions.setState("previewMode", true);
  });

  onCleanup(() => {
    actions.setState("previewMode", false);
    actions.syncValueToPreview();
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
                    const time = state.previewTimestamp;
                    if (time === null) {
                      return;
                    }
                    const newDatetime = `${state.previewDateStr} ${v}`;
                    actions.setPreviewValue(getTimestamp(newDatetime));
                  }}
                  size="small"
                  type={"second"}
                  value={state.previewTimeStr}
                />
              )
            : undefined
        }
        multiple={false}
        onChange={(v) => {
          if (v[0] === state.previewDateStr) {
            return;
          }
          const newDatetime = `${v} ${state.previewTimeStr}`;
          actions.setPreviewValue(getTimestamp(newDatetime));
        }}
        type={state.type as any}
        value={[state.previewDateStr]}
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
            state.triggerRef?.blur();
            actions.syncPreviewToValue();
          }}
          size={30}
          style={{ width: "100%", "flex-shrink": 1 }}
          variant="text"
        />
        <Button
          icon={<IconFluentDismiss24Regular />}
          onClick={() => {
            state.triggerRef?.blur();
            actions.syncValueToPreview();
          }}
          size={30}
          style={{ width: "100%", "flex-shrink": 1 }}
          variant="text"
        />
      </div>
    </div>
  );
}

export function DatePicker<T = string>(props: {
  value?: string;
  onChange?: (value: NoInfer<T>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  placeholder?: string;
  type?: DatePickerType;
  clearable?: boolean;
  dateRange?: [DateArgs, DateArgs];
  cellClass?: string | ((date: string) => string);
  toValue?: DatePickerToValueFunc<T>;
  highlightYears?:
    | number[]
    | ((visibleYearRange: [number, number]) => MaybePromise<number[]>);
  highlightMonths?:
    | string[]
    | ((visibleYear: number) => MaybePromise<string[]>);
  highlightDates?:
    | DateArgs[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[]
      ) => MaybePromise<DateArgs[]>);
  disabledDates?:
    | DateArgs[]
    | ((
        visibleYear: number,
        visibleMonth: number,
        visibleDates: string[]
      ) => MaybePromise<DateArgs[]>);
}) {
  return (
    <Root
      dateRange={props.dateRange}
      disabled={props.disabled}
      onBlur={props.onBlur}
      onChange={props.onChange}
      onFocus={props.onFocus}
      placeholder={props.placeholder}
      toValue={props.toValue}
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
