import styles from 'sass:./progress.scss';
import { CircleProgressCore } from 'jige-core';
import { mergeProps } from 'solid-js';
import type { JSX } from 'solid-js/jsx-runtime';
import { mountStyle } from 'solid-tiny-utils';

export function CircleProgress(props: {
  percent: number;
  radius?: number;
  fillWidth?: number;
  railWidth?: number;
  size?: string;
  gapOffsetDegree?: number;
  gapDegree?: number;
  offsetDegree?: number;
  children?: JSX.Element;
  railColor?: string;
  fillColor?: string;
  injectSVG?: JSX.Element;
}) {
  mountStyle(styles, 'jige-ui-progress');
  const realProps = mergeProps(
    {
      radius: 50,
      fillWidth: 8,
      railWidth: 8,
      gapOffsetDegree: 0,
      gapDegree: 0,
      offsetDegree: 0,
      size: '100px',
      railColor: 'var(--jg-t-bg3)',
      fillColor: 'var(--jg-t-hl)',
    },
    props
  );
  return (
    <div
      class="jg-progress-circle"
      style={{ width: realProps.size, height: realProps.size }}
    >
      <CircleProgressCore
        gapDegree={realProps.gapDegree}
        gapOffsetDegree={realProps.offsetDegree}
      >
        {props.injectSVG}
        <CircleProgressCore.Rail
          class="jg-progress-circle-rail"
          color={realProps.railColor}
          radius={realProps.radius}
          strokeWidth={realProps.railWidth}
        />
        <CircleProgressCore.Fill
          class="jg-progress-circle-fill"
          color={realProps.fillColor}
          percent={realProps.percent}
          radius={realProps.radius}
          strokeWidth={realProps.fillWidth}
        />
      </CircleProgressCore>
      <div class="jg-progress-circle-content">{props.children}</div>
    </div>
  );
}
