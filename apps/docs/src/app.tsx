import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { JigeDialogProvider, JigeProvider, JigeToastProvider } from "jige-ui";
import { Suspense } from "solid-js";
import { createWatch } from "solid-tiny-utils";
import { Header } from "./parts/header";
import { Layout } from "./parts/layout";
import "uno.css";
import { useAppState } from "./states/app-state";

export default function App() {
  const [state] = useAppState();
  createWatch(
    () => state.isDark,
    (isDark) => {
      document.body.classList.toggle("dark", isDark);
    }
  );
  return (
    <JigeProvider>
      <JigeDialogProvider>
        <JigeToastProvider>
          <Router
            root={(props) => (
              <div class="h-screen flex flex-col w-full">
                <Header />
                <Layout>
                  <Suspense>{props.children}</Suspense>
                </Layout>
              </div>
            )}
          >
            <FileRoutes />
          </Router>
        </JigeToastProvider>
      </JigeDialogProvider>
    </JigeProvider>
  );
}
