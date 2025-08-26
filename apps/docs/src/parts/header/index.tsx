import { Button } from 'jige-ui';
import { useAppState } from '~/states/app-state';

export function Header() {
  const [, appActs] = useAppState();
  return (
    <header class="flex justify-between items-center p-2 b-b b-solid b-t-border">
      <nav class="flex gap-1">
        <Button
          class="text-lg font-bold"
          href={'/'}
          label="Home"
          variant="text"
        />
      </nav>
      <nav>
        <Button
          icon={<div class="i-fluent:dark-theme-24-regular" />}
          onClick={() => {
            appActs.setState('isDark', (prev) => !prev);
          }}
          variant="text"
        />
      </nav>
    </header>
  );
}
