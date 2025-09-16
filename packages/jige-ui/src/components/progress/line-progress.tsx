import styles from "sass:./progress.scss";
import { createMemo } from "solid-js";
import { mountStyle } from "solid-tiny-utils";

export function LineProgress(props: {
  percent?: number;
  fillColor?: string;
  railColor?: string;
  height?: string;
  width?: string;
}) {
  mountStyle(styles, "jige-ui-progress");

  const normalizedPercent = createMemo(() => {
    if (props.percent === undefined) {
      return 45;
    }
    return Math.min(100, Math.max(0, props.percent));
  });

  const isIndeterminate = createMemo(() => props.percent === undefined);

  const background = createMemo(() => {
    const color = props.fillColor || "var(--jg-t-hl)";
    if (isIndeterminate()) {
      return `linear-gradient(90deg, transparent, ${color} 30%, ${color} 65%, transparent)`;
    }

    return color;
  });

  return (
    <div
      class="jg-progress-line"
      style={{
        height: props.height || "8px",
        width: props.width || "100%",
        background: props.railColor || "var(--jg-t-bg3)",
        overflow: "hidden",
      }}
    >
      <div
        class="jg-progress-line-fill"
        classList={{
          "jg-progress-line-fill-indeterminate": isIndeterminate(),
        }}
        style={{
          width: `${normalizedPercent()}%`,
          background: background(),
        }}
      />
    </div>
  );
}
