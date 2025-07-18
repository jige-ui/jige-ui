import { createWatch } from 'jige-utils'
import context from './context'

export function Fill(props: {
  radius: number
  strokeWidth: number
  percent: number
  color: string
  offsetDegree?: number
  class?: string
}) {
  const [state, actions] = context.useContext()

  createWatch(
    () => props.strokeWidth,
    () => {
      actions.setState('fillWidth', props.strokeWidth)
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
          percent: props.percent || 0,
          viewBoxWidth: state.viewBoxSize,
          offsetDegree: props.offsetDegree || 0,
          strokeColor: props.color,
        })}
      />
    </g>
  )
}
