/* @refresh reload */
import { render } from "solid-js/web";
import { enableGlobalStore } from "solid-tiny-context";
import { JigeDialogProvider, JigeProvider, JigeToastProvider } from "~/build";
import { App } from "./app";

import "uno.css";

const root = document.querySelector("#root");

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
  root!
);

enableGlobalStore();
