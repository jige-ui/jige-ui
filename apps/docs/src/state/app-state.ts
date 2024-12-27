import { defineGlobalStore } from 'solid-uses'

const appState = defineGlobalStore('app-state', {
  state: () => ({
    isDark: false,
    hue: 165,
  }),
  persist: 'localStorage',
})

export function useAppState() {
  return appState
}
