import { FloatingUiCore, SliderCore } from 'jige-core'
import styles from 'sass:./slider.scss'
import { mountStyle, watch } from 'solid-uses'
import { Popover } from '../popover'

function ToopTipSliderThumb() {
  const floatActs = FloatingUiCore.useContext()[1]
  const sliderState = SliderCore.useContext()[0]

  watch(() => sliderState.value, () => {
    floatActs.updatePos()
  })

  watch(() => sliderState.isDragging, (isDragging) => {
    floatActs.setOpen(isDragging)
  })

  return (
    <>
      <Popover.Trigger>
        <SliderCore.Thumb
          class="jg-slider-thumb"
          style={{
            left: `${sliderState.percentage}%`,
          }}
        />
      </Popover.Trigger>
      <Popover.Content zindex={999} arrow class="jg-slider-tip-content" background="var(--jg-t-hl)" color="white">
        {sliderState.value}
      </Popover.Content>
    </>

  )
}

export function Slider(props: {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
}) {
  mountStyle(styles, 'jige-ui-slider')
  return (
    <SliderCore {...props}>
      <Popover
        placement="top"
        trigger="manual"
      >
        <SliderCore.Native />
        <SliderCore.Track class="jg-slider-track">
          {state => (
            <>
              <SliderCore.Fill
                class="jg-slider-fill"
                style={{
                  width: `${state.percentage}%`,
                }}
              />
              <ToopTipSliderThumb />
            </>
          )}
        </SliderCore.Track>
      </Popover>
    </SliderCore>
  )
}
