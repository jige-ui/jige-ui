import { FloatingUiCore } from 'jige-core'

import aniFloatCss from 'sass:../../styles/common/ani-floating-ui.scss'
import css from 'sass:./popover.scss'
import { mountStyle } from 'solid-uses'

export function Root(props: Parameters<typeof FloatingUiCore>[0]) {
  mountStyle(css, 'jige-ui-popover')
  mountStyle(aniFloatCss, 'jige-ui-ani-floating-ui')
  return <FloatingUiCore {...props} />
}
