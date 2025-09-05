import css from 'sass:./segment.scss';
import { RadioGroupCore } from 'jige-core';
import type { JSX } from 'solid-js';
import { createMemo, For, mergeProps, onMount } from 'solid-js';
import { createStore, type SetStoreFunction } from 'solid-js/store';
import { mountStyle } from 'solid-tiny-utils';
import { dataIf } from '~/common/dataset';
import { Thumb } from './thumb';
import type { RadioOption } from './types';

function SegmentWrapper(props: {
  children: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties;
}) {
  const [radioState] = RadioGroupCore.useContext();
  return (
    <div
      class={props.class}
      data-disabled={dataIf(radioState.disabled)}
      style={props.style}
    >
      {props.children}
    </div>
  );
}

function Item(props: {
  label: string;
  value: string | number;
  checked: boolean;
  options: { value: string | number }[];
  setItemRefs: SetStoreFunction<Record<string | number, HTMLButtonElement>>;
}) {
  let ref!: HTMLButtonElement;
  const state = RadioGroupCore.useContext()[0];

  onMount(() => {
    props.setItemRefs(props.value, ref);
  });
  const hideDivider = createMemo(() => {
    if (props.checked) {
      return true;
    }
    const index = props.options.findIndex(
      (option) => option.value === state.value
    );
    return props.options[index + 1]?.value === props.value;
  });
  return (
    <button
      class="jg-segment-item"
      classList={{
        'hide-divider': hideDivider(),
      }}
      data-checked={dataIf(props.checked)}
      ref={ref}
      tabIndex={-1}
      type="button"
    >
      {props.label}
    </button>
  );
}

export function Segment(props: {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  thumbBg?: string;
  railBg?: string;
  class?: string;
  thumbClass?: string;
  disabled?: boolean;
}) {
  mountStyle(css, 'jige-ui-segment');

  const normalizeOptions = createMemo(() => {
    return props.options.map((option) => {
      if (typeof option === 'string') {
        return { label: option, value: option };
      }
      return option;
    });
  });

  const finalProps = mergeProps(
    {
      thumbBg: 'var(--jg-t-bg1)',
      railBg: 'var(--jg-t-bg3)',
      class: '',
    },
    props
  );

  const [itemRefs, setItemRefs] = createStore<
    Record<string | number, HTMLButtonElement>
  >({});

  return (
    <RadioGroupCore
      disabled={props.disabled}
      onChange={props.onChange}
      value={props.value}
    >
      <SegmentWrapper
        class={`jg-segment ${finalProps.class}`}
        style={{
          background: finalProps.railBg,
        }}
      >
        <Thumb
          bg={finalProps.thumbBg}
          itemRefs={itemRefs}
          options={normalizeOptions()}
        />
        <For each={normalizeOptions()}>
          {(item) => (
            <RadioGroupCore.Item value={item.value as any}>
              <RadioGroupCore.ItemNative />
              <RadioGroupCore.ItemControl>
                {(state) => (
                  <Item
                    checked={state.value === item.value}
                    label={item.label}
                    options={normalizeOptions()}
                    setItemRefs={setItemRefs}
                    value={item.value}
                  />
                )}
              </RadioGroupCore.ItemControl>
            </RadioGroupCore.Item>
          )}
        </For>
      </SegmentWrapper>
    </RadioGroupCore>
  );
}
