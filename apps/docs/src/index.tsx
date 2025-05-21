import { JigeDialogProvider, JigeProvider, JigeToastProvider } from 'jige-ui'

/* @refresh reload */
import { render } from 'solid-js/web'
import { enableGlobalStore } from 'solid-uses'
import { App } from './App'

import 'uno.css'

const root = document.querySelector('#root')

render(
  () => (
    <JigeProvider>
      <JigeDialogProvider>
        <JigeToastProvider>
          <App />
        </JigeToastProvider>
      </JigeDialogProvider>
    </JigeProvider>
  ),
  root!,
)

enableGlobalStore()
