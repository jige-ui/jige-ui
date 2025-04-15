import { Button } from 'jige-ui'
import { createStore } from 'solid-js/store'
import { Playground } from '~/components/playground'

export function Demo() {
  const [p, setP] = createStore({
    loading: false,
    disabled: false,
    icon: true,
    color: '',
    variant: 'solid',
    size: 'medium',
    label: 'Button',
  })

  return (
    <Playground>
      <Playground.MainArea>
        <Button
          loading={p.loading}
          disabled={p.disabled}
          variant={p.variant as any}
          size={p.size as any}
          color={p.color}
          icon={p.icon && <div class='i-ri-account-circle-line' />}
          label={p.label}
        />
      </Playground.MainArea>
      <Playground.PropertySetting
        properties={p}
        onChange={setP}
        typeDeclaration={{
          size: ['small', 'medium', 'large', 50] as string[],
          variant: ['solid', 'text', 'link'],
        }}
      />
    </Playground>
  )
}
