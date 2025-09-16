// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import { enableGlobalStore } from "solid-tiny-context";

mount(() => <StartClient />, document.getElementById("app")!);

enableGlobalStore();
