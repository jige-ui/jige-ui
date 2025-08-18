import css from 'sass:./listbox.scss';
import type { JSX } from 'solid-js';
import { createMemo, mergeProps, Show } from 'solid-js';
import { isArray, mountStyle } from 'solid-tiny-utils';
import { ListInner } from './list-inner';
import { VirtualInner } from './virtual-inner';

export function Listbox<T extends any[]>(props: {
  virtual?: boolean;
  fallback?: JSX.Element;
  items: T;
  rootHeight: number;
  rowHeight: number;
  overscanCount?: number;
  children: (item: T[number], index: number) => JSX.Element;
  onSelect?: (item: T[number], index: number) => void;
  selectIndex?: number | number[];
  selectTrigger?: 'click' | 'arrow';
  itemClass?: string;
  class?: string;
  scrollToSelected?: boolean;
  preventFocus?: boolean;
  scrollTop?: number;
}) {
  mountStyle(css, 'jige-ui-listbox');
  const realProps = mergeProps(
    {
      selectIndex: -1,
      selectTrigger: 'click' as 'click' | 'arrow',
      onSelect: () => {},
      scrollToSelected: true,
      preventFocus: false,
      overscanCount: 5,
      fallback: <div />,
    },
    props
  );

  const realSelectIndex = createMemo(() => {
    if (isArray(realProps.selectIndex)) {
      return realProps.selectIndex;
    }
    return [realProps.selectIndex];
  });

  return (
    <Show
      fallback={<ListInner {...realProps} selectIndex={realSelectIndex()} />}
      when={props.virtual || props.items.length > 500}
    >
      <VirtualInner {...realProps} selectIndex={realSelectIndex()} />
    </Show>
  );
}
