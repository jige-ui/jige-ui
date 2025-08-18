import routes from 'virtual:pages';
import { Router, useCurrentMatches } from '@solidjs/router';
import { esday } from 'esday';
import type { JSX } from 'solid-js';
import { createMemo, onMount, Suspense } from 'solid-js';
import { createWatch, makeEventListener } from 'solid-tiny-utils';
import { Scrollbar } from '~/build';
import { Aside } from './parts/aside';
import { Header } from './parts/header';
import { useAppState } from './state/app-state';

function RouteWrapper(props: { children: JSX.Element }) {
  const matches = useCurrentMatches();
  const info = createMemo(() => {
    const m = matches();
    if (m.length === 0) {
      return {};
    }
    return m.at(-1)?.route.info || {};
  });
  return (
    <div class="p-2">
      <div class="fw-bold text-2xl">{info().title}</div>
      <div class="flex items-center gap-1 text-sm">
        <span>updated:</span>
        <span>{esday(info().updated).format('YYYY-MM-DD')}</span>
      </div>
      <div class="p-2">{props.children}</div>
    </div>
  );
}

export function App() {
  const [state] = useAppState();

  createWatch(
    () => state.isDark,
    (d) => {
      document.body.classList.toggle('dark', d);
    }
  );

  let timer: NodeJS.Timeout;

  onMount(() => {
    makeEventListener(window, 'resize', () => {
      document.body.classList.add('no-transition');
      clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.classList.remove('no-transition');
      }, 200);
    });
  });
  return (
    <Router
      root={(props) => (
        <div class="flex h-screen w-screen flex-col bg-t-bg2">
          <div class="h-45px w-full bg-t-bg2 ">
            <Header />
          </div>
          <div class="flex h-[calc(100%-45px)] w-full">
            <div class="h-full w-185px bg-t-bg2 ">
              <Aside />
            </div>
            <Suspense>
              <Scrollbar class="b-rd-tl-2xl b b-t-border w-[calc(100%-185px)] bg-t-bg1">
                <RouteWrapper>{props.children}</RouteWrapper>
              </Scrollbar>
            </Suspense>
          </div>
        </div>
      )}
    >
      {routes}
    </Router>
  );
}
