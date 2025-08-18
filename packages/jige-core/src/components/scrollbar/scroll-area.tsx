import { mergeRefs } from '@solid-primitives/refs';
import { splitProps } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { runSolidEventHandler } from '@/common/solidjs';
import context from './context';

export function ScrollArea(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [state, action] = context.useContext();
  const [local, others] = splitProps(props, [
    'children',
    'onScroll',
    'onScrollEnd',
    'ref',
  ]);

  return (
    <div
      {...others}
      onScroll={(e) => {
        action.setValue();
        action.setState('isScrolling', true);
        runSolidEventHandler(e, local.onScroll);
      }}
      onScrollEnd={(e) => {
        action.setState('isScrolling', false);
        runSolidEventHandler(e, local.onScrollEnd);
      }}
      ref={mergeRefs(local.ref, (el) => {
        action.setState('refContent', el);
      })}
      style={{
        position: 'relative',
        overflow: 'auto',
        'scrollbar-width': 'none',
        height: state.height,
        'max-height': state.maxHeight,
        'user-select': state.isDragging ? 'none' : undefined,
      }}
    >
      {local.children}
    </div>
  );
}
