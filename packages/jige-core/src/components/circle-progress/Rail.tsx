import { createWatch } from 'jige-utils'
import context from './context'

export function Rail(props: {
  radius: number
  strokeWidth: number
  color: string
  class?: string
}) {
  const [state, actions] = context.useContext()
  createWatch(
    () => props.strokeWidth,
    () => {
      actions.setState('railWidth', props.strokeWidth)
    },
  )

  return (
    <g>
      <path
        d={actions.getPathString(props.radius)}
        stroke-width={props.strokeWidth}
        stroke-linecap='round'
        fill='none'
        class={props.class}
        style={actions.getPathStyles({
          radius: props.radius,
          percent: 100,
          viewBoxWidth: state.viewBoxSize,
          offsetDegree: 0,
          strokeColor: props.color,
        })}
      />
    </g>
  )
}
