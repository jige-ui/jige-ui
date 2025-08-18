import { createStore } from 'solid-js/store';
import { Button } from '~/build';
import { Playground } from '../../../components/playground';

export default function Demo() {
  const [p, setP] = createStore({
    loading: false,
    disabled: false,
    icon: true,
    color: '',
    variant: 'solid' as const,
    size: 'medium' as const,
    label: 'Button',
  });

  return (
    <Playground>
      <Playground.MainArea>
        <Button
          color={p.color}
          disabled={p.disabled}
          icon={p.icon && <div class="i-fluent:person-circle-24-regular" />}
          label={p.label}
          loading={p.loading}
          size={p.size}
          variant={p.variant}
        />
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          size: ['small', 'medium', 'large', 50] as string[],
          variant: ['solid', 'text', 'link'],
        }}
      />
    </Playground>
  );
}
