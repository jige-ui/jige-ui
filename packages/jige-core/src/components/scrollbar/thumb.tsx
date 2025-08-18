import type { JSX } from 'solid-js';
import { createMemo, createSignal, onMount, splitProps } from 'solid-js';
import { makeEventListener } from 'solid-tiny-utils';
import { combineStyle } from '@/build';
import context from './context';

export default function Thumb(
  props: { class?: string; type: 'vertical' | 'horizontal' } & Omit<
    JSX.HTMLAttributes<HTMLDivElement>,
    'ref' | 'onClick' | 'children' | 'onMouseDown'
  >
) {
  let isMove = false;
  let startY = 0;
  let startX = 0;
  let startPer = 0;

  let ref!: HTMLDivElement;
  const [state, action] = context.useContext();
  const [shouldUpdate, setShouldUpdate] = createSignal(0);

  const isVertical = () => props.type === 'vertical';

  const barLength = createMemo(() => {
    const $bar = ref?.parentElement;
    shouldUpdate();
    state.domHPer;
    state.domVPer;
    if (!$bar) {
      return 0;
    }

    return isVertical() ? $bar.clientHeight : $bar.clientWidth;
  });

  const length = createMemo(() => {
    if (isVertical()) {
      return Math.max((barLength() * state.domVPer) / 100, 25);
    }
    return Math.max((barLength() * state.domHPer) / 100, 25);
  });

  const transforms = createMemo(() => {
    const diff = barLength() / length();
    if (isVertical()) {
      return (state.verticalPer || 0) * (diff - 1);
    }
    return (state.horizontalPer || 0) * (diff - 1);
  });

  onMount(() => {
    setShouldUpdate(shouldUpdate() + 1);
    makeEventListener(document, 'mousemove', (e) => {
      if (!isMove) {
        return;
      }
      e.preventDefault();

      if (isVertical()) {
        const diff = e.clientY - startY;

        const percent = (diff / (barLength() - length())) * 100;
        action.setScrollTop(startPer + percent);
      } else {
        const diff = e.clientX - startX;

        const percent = (diff / (barLength() - length())) * 100;
        action.setScrollLeft(startPer + percent);
      }
    });

    makeEventListener(document, 'mouseup', () => {
      isMove = false;
      action.setState('isDragging', false);
    });
  });

  const [local, others] = splitProps(props, ['style']);

  return (
    <div
      {...others}
      data-scrollbar-dragging={state.isDragging}
      onMouseDown={(e) => {
        e.preventDefault();
        action.setState('isDragging', true);
        isMove = true;
        startX = e.clientX;
        startY = e.clientY;
        startPer = isVertical()
          ? state.verticalPer || 0
          : state.horizontalPer || 0;
      }}
      ref={ref}
      style={combineStyle(
        {
          transform: `translate${isVertical() ? 'Y' : 'X'}(${transforms()}%)`,
          height: `${isVertical() ? `${length()}px` : '100%'}`,
          width: `${isVertical() ? '100%' : `${length()}px`}`,
        },
        local.style
      )}
    />
  );
}
