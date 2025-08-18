import type { Accessor } from 'solid-js';
import { createMemo, createSignal } from 'solid-js';

export function createVirtualList<T>(params: {
  items: Accessor<T[]>;
  rowHeight: Accessor<number>;
  rootHeight: Accessor<number>;
  overscanCount: Accessor<number>;
}) {
  const { items, rowHeight, rootHeight, overscanCount } = params;
  const [offset, setOffset] = createSignal(0);
  const getFirstIdx = () =>
    Math.max(0, Math.floor(offset() / rowHeight()) - overscanCount());
  const getLastIdx = () =>
    Math.min(
      items().length,
      Math.floor(offset() / rowHeight()) +
        Math.ceil(rootHeight() / rowHeight()) +
        overscanCount()
    );

  const containerHeight = createMemo(() => items().length * rowHeight());
  const viewerTop = createMemo(() => getFirstIdx() * rowHeight());
  const visibleItems = createMemo(() => {
    return items().slice(getFirstIdx(), getLastIdx());
  });

  const onScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    setOffset(target.scrollTop);
  };

  return [{ containerHeight, viewerTop, visibleItems }, onScroll] as const;
}
