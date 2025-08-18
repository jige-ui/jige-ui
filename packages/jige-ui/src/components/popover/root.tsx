import css from 'sass:./popover.scss';

import aniFloatCss from 'sass:../../styles/common/ani-floating-ui.scss';
import { FloatingUiCore } from 'jige-core';
import { mountStyle } from 'solid-tiny-utils';

export function Root(props: Parameters<typeof FloatingUiCore>[0]) {
  mountStyle(css, 'jige-ui-popover');
  mountStyle(aniFloatCss, 'jige-ui-ani-floating-ui');
  return <FloatingUiCore {...props} />;
}
