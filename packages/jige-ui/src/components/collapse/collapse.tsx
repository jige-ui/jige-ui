import styles from 'sass:./collapse.scss';
import { CollapsibleCore } from 'jige-core';
import { createMemo } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { mountStyle } from 'solid-tiny-utils';

export function Arrow1(props: { size?: number }) {
  const state = CollapsibleCore.useContext()[0];
  const realSize = createMemo(() => props.size || 6);
  const isOpen = createMemo(() => state.status.startsWith('open'));
  const commonLineStyle = createMemo(
    () =>
      ({
        width: `${realSize()}px`,
        height: `${realSize() / 4}px`,
        display: 'block',
        position: 'absolute',
        background: 'currentColor',
        'border-radius': `${realSize() / 3}px`,
        transition: 'all .3s var(--jg-bezier)',
        top: `${realSize()}px`,
        left: `${realSize() / 2}px`,
      }) as JSX.CSSProperties
  );
  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        width: `${realSize() * 2}px`,
        height: `${realSize() * 2}px`,
      }}
    >
      <div
        style={{
          ...commonLineStyle(),
          transform: `rotate(${isOpen() ? '45deg' : '-45deg'})  translate(${realSize() / 2.43}px)`,
        }}
      />
      <div
        style={{
          ...commonLineStyle(),
          transform: `rotate(${isOpen() ? '-45deg' : '45deg'})  translate(-${realSize() / 2.43}px)`,
        }}
      />
    </div>
  );
}

export function Content(props: { children: JSX.Element }) {
  return (
    <CollapsibleCore.Content class="jg-collapse-content">
      {props.children}
    </CollapsibleCore.Content>
  );
}

export function Root(props: { children: JSX.Element }) {
  mountStyle(styles, 'jige-ui-collapse');
  return <CollapsibleCore>{props.children}</CollapsibleCore>;
}
