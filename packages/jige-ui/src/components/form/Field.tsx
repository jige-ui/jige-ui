import { FormCore, callMaybeCallableChild } from 'jige-core'
import { type JSX, Show, createMemo, createUniqueId, splitProps } from 'solid-js'
import { dataIf } from '~/common/dataset'
import { fieldContext } from './context'
import { createWatch } from 'jige-utils'

function ErrorOrDescription(props: { description?: string }) {
  const [fieldState] = FormCore.useField()
  const [state, actions] = fieldContext.useContext()

  const errors = createMemo(() => fieldState.errors.map((e) => e.message))

  createWatch([errors, () => props.description], ([e, d]) => {
    actions.setState('hasDescription', e.length > 0 || !!d)
  })

  return (
    <Show when={state.hasDescription}>
      <div
        class='jg-form-field-description'
        id={state.descriptionID}
        data-invalid={dataIf(errors()?.length)}
      >
        <Show when={errors()?.length > 0} fallback={props.description}>
          {errors().join(',')}
        </Show>
      </div>
    </Show>
  )
}

function Label(props: { label?: string }) {
  const [state] = fieldContext.useContext()
  return (
    <Show when={state.hasLabel}>
      <label class='jg-form-field-label' id={state.labelID} for={state.labelFor}>
        {props.label}
      </label>
    </Show>
  )
}

export function Field(
  props: Parameters<typeof FormCore.Field>[0] & {
    description?: string
    label?: string
    class?: string
    style?: string | JSX.CSSProperties
    required?: boolean
  },
) {
  const [localProps, otherProps] = splitProps(props, [
    'description',
    'children',
    'label',
    'class',
    'style',
    'required',
    'validators',
  ])
  const id = createUniqueId()
  const Context = fieldContext.initial({
    hasLabel: () => !!localProps.label,
    descriptionID: `field-describe__${id}`,
    labelID: `field-label__${id}`,
    labelFor: `field-control__${id}`,
  })
  return (
    <Context.Provider>
      <FormCore.Field
        {...otherProps}
        validators={[
          (v) => {
            if (localProps.required) {
              if (!v?.toString().trim() || Number.isNaN(v)) return '必填项！'
            }
          },
          ...(localProps.validators || []),
        ]}
      >
        {(state, actions) => (
          <div
            class={`jg-form-field ${localProps.class || ''}`}
            style={localProps.style}
            data-invalid={dataIf(state.errors.length)}
            data-required={dataIf(localProps.required)}
          >
            <div class='jg-form-field-control'>
              <Label label={localProps.label} />
              <div>{callMaybeCallableChild(localProps.children, state, actions)}</div>
            </div>
            <ErrorOrDescription description={localProps.description} />
          </div>
        )}
      </FormCore.Field>
    </Context.Provider>
  )
}
