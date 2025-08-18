import type { JSX } from 'solid-js';
import { Scrollbar } from '../scrollbar';

export function InnerContent(props: { children: JSX.Element }) {
  return (
    <Scrollbar
      contentStyle={{
        padding: '8px',
      }}
      height="100%"
    >
      {props.children}
    </Scrollbar>
  );
}
