import { createWatch } from 'solid-tiny-utils';
import context from './context';

export function Rail(props: {
  radius: number;
  strokeWidth: number;
  color: string;
  class?: string;
}) {
  const [state, actions] = context.useContext();
  createWatch(
    () => props.strokeWidth,
    () => {
      actions.setState('railWidth', props.strokeWidth);
    }
  );

  return (
    <g>
      <path
        class={props.class}
        d={actions.getPathString(props.radius)}
        fill="none"
        stroke-linecap="round"
        stroke-width={props.strokeWidth}
        style={actions.getPathStyles({
          radius: props.radius,
          percent: 100,
          viewBoxWidth: state.viewBoxSize,
          offsetDegree: 0,
          strokeColor: props.color,
        })}
      />
    </g>
  );
}
