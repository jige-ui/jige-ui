import type { EsDay } from "esday";
import { batch, For, onCleanup, onMount } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import { Button } from "~/components/button";
import { IconFluentCheckmark24Regular } from "~/components/icons/fluent-checkmark-24-regular";
import { IconFluentDismiss24Regular } from "~/components/icons/fluent-dismiss-24-regular";
import { DatePickerMainPanel } from "../date-picker";
import { TimePicker } from "../time-picker";
import { context } from "./context";

export function Panel(props: {
  presets?: {
    label: string;
    value: (
      state: ReturnType<typeof context.useContext>[0]
    ) => [string, string];
  }[];
}) {
  const [state, actions] = context.useContext();
  const commonProps = {
    dateRange: ["1800-01-01", "2200-01-01"] as [string, string],
    highlightYears: [] as number[],
    highlightMonths: [] as string[],
    highlightDates: [] as string[],
    disabledDates: [] as string[],
    type: "date" as const,
    multiple: true,
  };

  onMount(() => {
    actions.updateCurrYearMonthData();
    actions.setState("previewMode", true);
  });

  onCleanup(() => {
    actions.setState("previewMode", false);
  });

  const setCurrYearMonthData = (
    key: keyof typeof state.currYearMonthData,
    value: number
  ) => {
    actions.setState("currYearMonthData", key, value);
  };

  const handleFromPanel = (currYear: number, currMonth: number) => {
    setCurrYearMonthData("fromYear", currYear);
    setCurrYearMonthData("fromMonth", currMonth);
    if (state.currYearMonthData.toYear < currYear) {
      setCurrYearMonthData("toYear", currYear);
    }
    if (
      state.currYearMonthData.toYear === currYear &&
      state.currYearMonthData.toMonth <= currMonth
    ) {
      setCurrYearMonthData("toMonth", currMonth + 1);
    }
  };

  const handleToPanel = (currYear: number, currMonth: number) => {
    setCurrYearMonthData("toYear", currYear);
    setCurrYearMonthData("toMonth", currMonth);
    if (state.currYearMonthData.fromYear > currYear) {
      setCurrYearMonthData("fromYear", currYear);
    }
    if (
      state.currYearMonthData.fromYear === currYear &&
      state.currYearMonthData.fromMonth >= currMonth
    ) {
      setCurrYearMonthData("fromMonth", currMonth - 1);
    }
  };

  const updateCurrYearMonthData = (
    currYear: number,
    currMonth: number,
    isFromPanel = true
  ) => {
    batch(() => {
      if (isFromPanel) {
        handleFromPanel(currYear, currMonth);
      } else {
        handleToPanel(currYear, currMonth);
      }
    });
  };

  const cellClass = (day: EsDay) => {
    const from = state.fromInst;
    const to = state.toInst;
    const isInRange = day > from && day < to;

    return isInRange ? "jg-dp-cell-in-range" : "";
  };

  createWatch(
    () => [state.value[0], state.value[1]],
    () => {
      actions.updateCurrYearMonthData();
    },
    { defer: true }
  );

  return (
    <div>
      <div class="jg-dp-range-panel">
        <DatePickerMainPanel
          cellClass={cellClass}
          currMonth={state.currYearMonthData.fromMonth}
          currYear={state.currYearMonthData.fromYear}
          disabled={state.disabled}
          headerRight={
            state.isDateTime
              ? () => (
                  <TimePicker
                    onChange={(v) => {
                      actions.setState("timeValue", 0, v);
                    }}
                    size="small"
                    value={state.timeValue[0]}
                  />
                )
              : undefined
          }
          onChange={(v) => {
            const length = v.length;
            const from = v[length - 2];
            const to = v[length - 1];
            if (state.dateValue[0] !== from || state.dateValue[1] !== to) {
              actions.setDateValue(to);
            }
          }}
          onCurrYearMonthChange={updateCurrYearMonthData}
          value={[...state.dateValue]}
          {...commonProps}
        />
        <div class="jg-dp-divider" />
        <DatePickerMainPanel
          cellClass={cellClass}
          currMonth={state.currYearMonthData.toMonth}
          currYear={state.currYearMonthData.toYear}
          disabled={state.disabled}
          headerRight={
            state.isDateTime
              ? () => (
                  <TimePicker
                    onChange={(v) => {
                      actions.setState("timeValue", 1, v);
                    }}
                    size="small"
                    value={state.timeValue[1]}
                  />
                )
              : undefined
          }
          onChange={(v) => {
            const length = v.length;
            const from = v[length - 2];
            const to = v[length - 1];
            if (state.dateValue[0] !== from || state.dateValue[1] !== to) {
              actions.setDateValue(to);
            }
          }}
          onCurrYearMonthChange={(currYear, currMonth) => {
            updateCurrYearMonthData(currYear, currMonth, false);
          }}
          value={[...state.dateValue]}
          {...commonProps}
        />
      </div>
      <div
        style={{
          display: "flex",
          "justify-content": "space-between",
          padding: "4px",
          "border-top": "1px solid var(--jg-t-border)",
        }}
      >
        <div
          style={{
            display: "flex",
            "align-items": "center",
          }}
        >
          <For each={props.presets}>
            {(preset) => (
              <Button
                label={preset.label}
                onClick={() => {
                  const value = preset.value(state);
                  actions.setValue(value);
                }}
                variant="link"
              />
            )}
          </For>
        </div>
        <div
          style={{
            display: "flex",
            "align-items": "center",
            width: "128px",
          }}
        >
          <Button
            icon={<IconFluentCheckmark24Regular />}
            onClick={() => {
              actions.syncPreviewToValue();
              actions.blurTrigger();
            }}
            style={{ width: "100%", "flex-shrink": 1 }}
            variant="text"
          />
          <Button
            icon={<IconFluentDismiss24Regular />}
            onClick={() => {
              actions.blurTrigger();
            }}
            style={{ width: "100%", "flex-shrink": 1 }}
            variant="text"
          />
        </div>
      </div>
    </div>
  );
}
