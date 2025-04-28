import styles from 'sass:./slider.scss'
import { FloatingUiCore, SliderCore } from 'jige-core'
import { mountStyle, watch } from 'solid-uses'
import { dataIf } from '~/common/dataset'
import { Form } from '~/components/form'
import { Popover } from '../../popover'

function ToolTipSliderThumb(props: {
  disabled?: boolean
  disableBind?: boolean
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
          disableBind={props.disableBind}
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

function Track(props: {
  disableBind?: boolean
  disabled?: boolean
}) {
  const [sliderState] = SliderCore.useContext()
  return (
    <SliderCore.Track class='jg-slider-track' data-disabled={dataIf(sliderState.disabled)}>
      <SliderCore.Fill
        class='jg-slider-fill'
        style={{
          width: `${sliderState.percentage}%`,
        }}
      />
      <ToolTipSliderThumb disableBind={props.disableBind} disabled={props.disabled} />
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
  disableBind?: boolean
}) {
  mountStyle(styles, 'jige-ui-slider')
  return (
    <SliderCore {...props}>
      <Popover placement='top' trigger='manual'>
        <SliderCore.Native {...Form.createNativeComponentAttrs()} />
        <Track disableBind={props.disableBind} disabled={props.disabled} />
      </Popover>
    </SliderCore>
  )
}
