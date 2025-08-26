import { defineGlobalStore } from 'solid-tiny-context';

const appState = defineGlobalStore('app-state', {
  state: () => ({
    isDark: false,
  }),
  persist: 'localStorage',
});

export function useAppState() {
  return appState;
}
