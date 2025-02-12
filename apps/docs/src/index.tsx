import { JigeDialogProvider, JigeProvider } from 'jige-ui'

/* @refresh reload */
import { render } from 'solid-js/web'
import { enableGlobalStore } from 'solid-uses'
import { App } from './App'

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
