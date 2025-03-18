import { FormCore, callMaybeCallableChild } from 'jige-core'
import { type JSX, Show, createMemo, createUniqueId, splitProps } from 'solid-js'
import { setData } from '~/common/dataset'
import { fieldContext } from './context'
import { watch } from 'solid-uses'

function ErrorOrDescription(props: { description?: string }) {
  const [fieldState] = FormCore.useField()
  const [state, actions] = fieldContext.useContext()

  const errors = createMemo(() => fieldState.errors.map((e) => e.message))

  watch([errors, () => props.description], ([e, d]) => {
    actions.setHasDescription(e.length > 0 || !!d)
  })

  return (
    <Show when={state.hasDescription}>
      <div
        class='jg-form-field-description'
        id={state.descriptionID}
        {...setData('invalid', !!errors()?.length)}
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
  },
) {
  const [localProps, otherProps] = splitProps(props, [
    'description',
    'children',
    'label',
    'class',
    'style',
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
      <FormCore.Field {...otherProps}>
        {(state, actions, nowrapData) => (
          <div
            class={`jg-form-field ${localProps.class || ''}`}
            style={localProps.style}
            {...setData('invalid', !!state.errors.length)}
          >
            <div class='jg-form-field-control'>
              <Label label={localProps.label} />
              <div>{callMaybeCallableChild(localProps.children, state, actions, nowrapData)}</div>
            </div>
            <ErrorOrDescription description={localProps.description} />
          </div>
        )}
      </FormCore.Field>
    </Context.Provider>
  )
}
