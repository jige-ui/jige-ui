import { batch, For, onCleanup, onMount } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import { getTimestamp } from "time-core";
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

  const handleLeftPanel = (currYear: number, currMonth: number) => {
    setCurrYearMonthData("leftYear", currYear);
    setCurrYearMonthData("leftMonth", currMonth);
    if (state.currYearMonthData.rightYear < currYear) {
      setCurrYearMonthData("rightYear", currYear);
    }
    if (
      state.currYearMonthData.rightYear === currYear &&
      state.currYearMonthData.rightMonth <= currMonth
    ) {
      setCurrYearMonthData("rightMonth", currMonth + 1);
    }
  };

  const handleRightPanel = (currYear: number, currMonth: number) => {
    setCurrYearMonthData("rightYear", currYear);
    setCurrYearMonthData("rightMonth", currMonth);
    if (state.currYearMonthData.leftYear > currYear) {
      setCurrYearMonthData("leftYear", currYear);
    }
    if (
      state.currYearMonthData.leftYear === currYear &&
      state.currYearMonthData.leftMonth >= currMonth
    ) {
      setCurrYearMonthData("leftMonth", currMonth - 1);
    }
  };

  const updateCurrYearMonthData = (
    currYear: number,
    currMonth: number,
    isFromPanel = true
  ) => {
    batch(() => {
      if (isFromPanel) {
        handleLeftPanel(currYear, currMonth);
      } else {
        handleRightPanel(currYear, currMonth);
      }
    });
  };

  const cellClass = (day: string) => {
    const from = getTimestamp(state.previewDateStrs[0]);
    const to = getTimestamp(state.previewDateStrs[1]);
    const value = getTimestamp(day);
    const isInRange = value > from && value < to;

    return isInRange ? "jg-dp-cell-in-range" : "";
  };

  createWatch(
    () => [state.previewDateStrs[0], state.previewDateStrs[1]],
    () => {
      console.log(state.previewDateStrs[0], state.previewDateStrs[1]);

      actions.updateCurrYearMonthData();
    },
    { defer: true }
  );

  return (
    <div>
      <div class="jg-dp-range-panel">
        <DatePickerMainPanel
          cellClass={cellClass}
          currMonth={state.currYearMonthData.leftMonth}
          currYear={state.currYearMonthData.leftYear}
          disabled={state.disabled}
          headerRight={
            state.isDateTime
              ? () => (
                  <TimePicker
                    onChange={(v) => {
                      const dateStr = state.previewDateStrs[0];
                      if (!dateStr) {
                        return;
                      }
                      const newDate = `${dateStr} ${v}`;
                      actions.setState("previewValues", 0, newDate);
                    }}
                    size="small"
                    value={state.previewTimeStrs[0]}
                  />
                )
              : undefined
          }
          onChange={(v) => {
            const length = v.length;
            const left = v[length - 2];
            const right = v[length - 1];
            if (
              state.previewDateStrs[0] !== left ||
              state.previewDateStrs[1] !== right
            ) {
              actions.setPreviewDate(right);
            }
          }}
          onCurrYearMonthChange={updateCurrYearMonthData}
          value={[...state.previewDateStrs]}
          {...commonProps}
        />
        <div class="jg-dp-divider" />
        <DatePickerMainPanel
          cellClass={cellClass}
          currMonth={state.currYearMonthData.rightMonth}
          currYear={state.currYearMonthData.rightYear}
          disabled={state.disabled}
          headerRight={
            state.isDateTime
              ? () => (
                  <TimePicker
                    onChange={(v) => {
                      const dateStr = state.previewDateStrs[1];
                      if (!dateStr) {
                        return;
                      }
                      const newDate = `${dateStr} ${v}`;
                      actions.setState("previewValues", 1, newDate);
                    }}
                    size="small"
                    value={state.previewTimeStrs[1]}
                  />
                )
              : undefined
          }
          onChange={(v) => {
            const length = v.length;
            const left = v[length - 2];
            const right = v[length - 1];
            if (
              state.previewDateStrs[0] !== left ||
              state.previewDateStrs[1] !== right
            ) {
              actions.setPreviewDate(right);
            }
          }}
          onCurrYearMonthChange={(currYear, currMonth) => {
            updateCurrYearMonthData(currYear, currMonth, false);
          }}
          value={[...state.previewDateStrs]}
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
              actions.blurTrigger();
              actions.syncPreviewToValue();
            }}
            style={{ width: "100%", "flex-shrink": 1 }}
            variant="text"
          />
          <Button
            icon={<IconFluentDismiss24Regular />}
            onClick={() => {
              actions.blurTrigger();
              actions.syncValueToPreview();
            }}
            style={{ width: "100%", "flex-shrink": 1 }}
            variant="text"
          />
        </div>
      </div>
    </div>
  );
}
