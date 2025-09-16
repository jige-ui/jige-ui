import { undefinedOr } from "jige-core";
import { createSignal, For } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { createWatch } from "solid-tiny-utils";
import { dataIf } from "~/common/dataset";
import { isDef } from "~/common/types";
import { Scrollbar } from "../scrollbar";

export function CommonScrollWrapper<T extends any[]>(props: {
  onScroll?: (e: Event) => void;
  rootHeight: number;
  rowHeight: number;
  contentStyle?: string | JSX.CSSProperties;
  ulStyle?: string | JSX.CSSProperties;
  children: (item: T[number], index: number) => JSX.Element;
  selectIndex: number[];
  onSelect: (item: T[number], index: number) => void;
  selectTrigger: "click" | "arrow";
  visibleItems?: { value: T[number]; index: number }[];
  items: T;
  fallback: JSX.Element;
  scrollToSelected: boolean;
  preventFocus: boolean;
  itemClass?: string;
  class?: string;
  scrollTop?: number;
}) {
  let listRef!: HTMLDivElement;

  const [hlIndex, setHlIndex] = createSignal(-1);
  const [scrollRef, setScrollRef] = createSignal<HTMLDivElement | null>(null);

  createWatch(
    () => props.selectIndex,
    (index) => {
      const lastItem = index.at(-1);
      setHlIndex(undefinedOr(lastItem, -1));
    }
  );

  function handleKeyDown(e: any) {
    if (props.preventFocus) {
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault(); // 防止滚动区域滚动
    }
    if (e.key === "ArrowDown") {
      setHlIndex((prev) => Math.min(prev + 1, props.items.length - 1));
    } else if (e.key === "ArrowUp") {
      setHlIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      props.onSelect(props.items[hlIndex()], hlIndex());
    }
    const $item = listRef?.querySelector(`[data-index="${hlIndex()}"]`);
    if ($item) {
      $item.scrollIntoView({ block: "nearest" });
    }
  }

  createWatch([hlIndex, scrollRef], ([index, ref]) => {
    if (!props.preventFocus) {
      listRef?.focus();
    }
    if (props.scrollToSelected) {
      const $item = listRef?.querySelector(`[data-index="${index}"]`);
      if ($item) {
        $item.scrollIntoView({ block: "nearest" });
      } else if (ref) {
        ref.scrollTop =
          index * props.rowHeight - (props.rootHeight - props.rowHeight);
      }
    }
    if (props.selectTrigger === "arrow") {
      props.onSelect(props.items[index], index);
    }
  });

  createWatch(
    () => [props.scrollTop, scrollRef()] as const,
    ([scrollTop, ref]) => {
      if (isDef(scrollTop) && ref) {
        ref.scrollTop = scrollTop;
      }
    }
  );

  return (
    <Scrollbar
      class={props.class}
      color="var(--jg-fg4)"
      contentStyle={props.contentStyle}
      maxHeight={`${props.rootHeight}px`}
      onScroll={props.onScroll}
      scrollRef={setScrollRef}
    >
      <div
        class="jg-listbox"
        onKeyDown={handleKeyDown}
        ref={listRef}
        role="listbox"
        style={props.ulStyle}
        tabIndex={0}
      >
        <For
          each={
            props.visibleItems ||
            props.items.map((item, index) => ({ value: item, index }))
          }
          fallback={props.fallback}
        >
          {(item) => {
            return (
              <div
                aria-selected={props.selectIndex.includes(item.index)}
                class={props.itemClass || "jg-listbox-item"}
                data-highlight={dataIf(item.index === hlIndex())}
                data-index={item.index}
                data-selected={dataIf(props.selectIndex.includes(item.index))}
                onClick={() => props.onSelect(item.value, item.index)}
                role="option"
                style={{
                  height: `${props.rowHeight}px`,
                }}
                tabIndex={-1}
              >
                <div class="jg-listbox-item-inner">
                  {props.children(item.value, item.index)}
                </div>
              </div>
            );
          }}
        </For>
      </div>
    </Scrollbar>
  );
}
