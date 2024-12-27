import { JigeDialogProvider, JigeProvider } from 'jige-ui'

/* @refresh reload */
import { render } from 'solid-js/web'
import { enableGlobalStore } from 'solid-uses'
import { App } from './App'

import '@unocss/reset/tailwind.css'
import '@unocss/reset/tailwind-compat.css'
import './index.css'
import 'uno.css'

const root = document.querySelector('#root')

render(() => (
  <JigeProvider>
    <JigeDialogProvider>
      <App />
    </JigeDialogProvider>
  </JigeProvider>
), root!)

enableGlobalStore()
