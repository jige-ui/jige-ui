import styles from 'sass:./slider.scss';
import { FloatingUiCore, SliderCore } from 'jige-core';
import { createWatch, mountStyle } from 'solid-tiny-utils';
import { dataIf } from '~/common/dataset';
import { Popover } from '../../popover';

function ToolTipSliderThumb() {
  const floatActs = FloatingUiCore.useContext()[1];
  const [sliderState] = SliderCore.useContext();

  createWatch(
    () => sliderState.value,
    () => {
      floatActs.updatePos();
    }
  );

  createWatch(
    () => sliderState.isDragging,
    (isDragging) => {
      floatActs.setOpen(isDragging);
    }
  );

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
      <Popover.Content
        arrow
        background="var(--jg-t-hl)"
        class="jg-slider-tip-content"
        color="white"
        zindex={999}
      >
        {sliderState.value}
      </Popover.Content>
    </>
  );
}

function Track() {
  const [sliderState] = SliderCore.useContext();
  return (
    <SliderCore.Track
      class="jg-slider-track"
      data-disabled={dataIf(sliderState.disabled)}
    >
      <SliderCore.Fill
        class="jg-slider-fill"
        style={{
          width: `${sliderState.percentage}%`,
        }}
      />
      <ToolTipSliderThumb />
    </SliderCore.Track>
  );
}

export function Slider(props: {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}) {
  mountStyle(styles, 'jige-ui-slider');
  return (
    <SliderCore {...props}>
      <Popover placement="top" trigger="manual">
        <SliderCore.Native />
        <Track />
      </Popover>
    </SliderCore>
  );
}
