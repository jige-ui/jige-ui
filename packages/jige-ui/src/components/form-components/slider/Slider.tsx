import styles from 'sass:./slider.scss'
import { FloatingUiCore, SliderCore } from 'jige-core'
import { mountStyle, watch } from 'solid-uses'
import { Form } from '~/components/form'
import { Popover } from '../../popover'
import { setData } from '~/common/dataset'

function ToopTipSliderThumb(props: {
  disabled?: boolean
}) {
  const floatActs = FloatingUiCore.useContext()[1]
  const [sliderState, sliderActs] = SliderCore.useContext()

  watch(
    () => sliderState.value,
    () => {
      floatActs.updatePos()
    },
  )

  watch(
    () => sliderState.isDragging,
    (isDragging) => {
      floatActs.setOpen(isDragging)
    },
  )

  return (
    <>
      <Popover.Trigger>
        <Form.Bind
          propDisabled={props.disabled}
          setDisabled={sliderActs.setDisabled}
          value={sliderState.value}
          setValue={sliderActs.setValue}
          setName={sliderActs.setName}
        >
          <SliderCore.Thumb
            class='jg-slider-thumb'
            style={{
              left: `${sliderState.percentage}%`,
            }}
          />
        </Form.Bind>
      </Popover.Trigger>
      <Popover.Content
        zindex={999}
        arrow
        class='jg-slider-tip-content'
        background='var(--jg-t-hl)'
        color='white'
      >
        {sliderState.value}
      </Popover.Content>
    </>
  )
}

function Track() {
  const [sliderState] = SliderCore.useContext()
  return (
    <SliderCore.Track class='jg-slider-track' {...setData({ disabled: sliderState.disabled })}>
      <SliderCore.Fill
        class='jg-slider-fill'
        style={{
          width: `${sliderState.percentage}%`,
        }}
      />
      <ToopTipSliderThumb />
    </SliderCore.Track>
  )
}

export function Slider(props: {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}) {
  mountStyle(styles, 'jige-ui-slider')
  return (
    <SliderCore {...props}>
      <Popover placement='top' trigger='manual'>
        <SliderCore.Native />
        <Track />
      </Popover>
    </SliderCore>
  )
}
