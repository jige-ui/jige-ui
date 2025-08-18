import type { JSX } from 'solid-js';

export function MainArea(props: { children: JSX.Element }) {
  return (
    <div
      class="flex w-[calc(100%-185px)] flex-1 flex-col items-center justify-start py-20"
      style={{
        'background-image':
          'radial-gradient(circle, var(--jg-t-border) 1px, transparent 1px)',
        'background-size': '16px 16px',
      }}
    >
      {props.children}
    </div>
  );
}
