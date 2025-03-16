import { Button, JigeRootContext, Popover, Slider } from 'jige-ui'
import { useAppState } from '~/state/app-state'

export function Header() {
  const [state, actions] = useAppState()
  const [jigeUiState, jigeUiActions] = JigeRootContext.useContext()
  return (
    <div class='flex items-center justify-between h-full'>
      <div class='flex'>
        <span class='ml-2 text-2xl font-bold'>Jige UI</span>
      </div>
      <div class='flex text-xl gap-2'>
        <Button
          variant='text'
          icon={<div class='i-ri-contrast-2-line' />}
          onClick={() => {
            actions.setIsDark(!state.isDark)
          }}
        />
        <Popover placement='bottom-end'>
          <Popover.Trigger>
            <Button variant='text' icon={<div class='i-ri-palette-line' />} />
          </Popover.Trigger>
          <Popover.Content arrow>
            <div class='p-2'>
              <Slider
                step={5}
                value={jigeUiState.hue}
                onChange={jigeUiActions.setHue}
                min={0}
                max={360}
              />
            </div>
          </Popover.Content>
        </Popover>

        <Button
          href='https://github.com/g-mero'
          variant='text'
          icon={<div class='i-ri-github-fill' />}
        />
      </div>
    </div>
  )
}
