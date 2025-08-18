import { combineStyle, FloatingUiCore } from 'jige-core';
import type { JSX } from 'solid-js';
import { createMemo, Show, splitProps } from 'solid-js';
import { isDef } from '~/common/types';
import { RootContext } from '../root/context';

export function Content(
  props: {
    arrow?: boolean | number;
    background?: string;
    color?: string;
    zindex?: number;
    animation?: string;
  } & JSX.HTMLAttributes<HTMLDivElement>
) {
  const [state] = RootContext.useContext();
  const [localProps, otherProps] = splitProps(props, [
    'arrow',
    'background',
    'color',
    'zindex',
    'children',
    'class',
    'style',
    'animation',
  ]);

  const classes = createMemo(() => {
    const result = ['jg-popover-content'];
    if (isDef(localProps.animation)) {
      result.push(localProps.animation);
    } else {
      result.push('ani-floating-ui-move');
    }

    if (localProps.class) {
      result.push(localProps.class);
    }

    return result.join(' ');
  });

  const [floatingState] = FloatingUiCore.useContext();

  const transformOrigin = createMemo(() => {
    const placement = floatingState.placement;
    const map: Record<string, string> = {
      top: 'bottom center',
      'top-start': 'bottom left',
      'top-end': 'bottom right',
      bottom: 'top center',
      'bottom-start': 'top left',
      'bottom-end': 'top right',
      left: 'center right',
      'left-start': 'top right',
      'left-end': 'bottom right',
      right: 'center left',
      'right-start': 'top left',
      'right-end': 'bottom left',
    };
    return map[placement] || 'center center';
  });

  return (
    <FloatingUiCore.Content
      {...otherProps}
      class={classes()}
      style={combineStyle(
        {
          '--jg-popover-bg': localProps.background || 'var(--jg-t-bg1)',
          '--jg-popover-color': localProps.color || 'var(--jg-fg2)',
          '--jg-transform-origin': transformOrigin(),
        },
        localProps.style
      )}
      zindex={localProps.zindex || state.zIndexConfig.popover}
    >
      {localProps.children}
      <Show when={localProps.arrow}>
        <FloatingUiCore.Arrow
          class="jg-popover-arrow"
          size={typeof localProps.arrow === 'number' ? localProps.arrow : 6}
        />
      </Show>
    </FloatingUiCore.Content>
  );
}
