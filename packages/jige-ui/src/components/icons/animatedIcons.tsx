import { IconSvgWrapper } from './shared'

export function AnimatedChecked() {
  return (
    <IconSvgWrapper>
      <path
        fill='none'
        stroke='currentColor'
        stroke-dasharray='24'
        stroke-dashoffset='24'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M5 11l6 6l10 -10'
      >
        <animate fill='freeze' attributeName='stroke-dashoffset' dur='0.2s' values='24;0' />
      </path>
    </IconSvgWrapper>
  )
}
