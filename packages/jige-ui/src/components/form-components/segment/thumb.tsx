import { RadioGroupCore } from "jige-core";
import { createMemo } from "solid-js";
import type { RadioOption } from "./types";

export function Thumb(props: {
  options: Exclude<RadioOption, string>[];
  bg: string;
  itemRefs: Record<string, HTMLButtonElement>;
}) {
  const state = RadioGroupCore.useContext()[0];
  const sliderX = createMemo(() => {
    const itemRef = props.itemRefs[state.value];
    if (!itemRef) {
      return 0;
    }
    const { left } = itemRef.getBoundingClientRect();
    const parentLeft = itemRef.parentElement?.getBoundingClientRect().left || 0;
    return left - parentLeft - 1;
  });

  const width = createMemo(() => {
    const itemRef = props.itemRefs[state.value];
    if (!itemRef) {
      return 0;
    }

    return itemRef.getBoundingClientRect().width;
  });
  return (
    <div
      class="jg-segment-thumb"
      style={{
        width: `${width()}px`,
        transform: `translateX(${sliderX()}px)`,
        background: props.bg,
      }}
    />
  );
}
