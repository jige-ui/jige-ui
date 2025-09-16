import { Show } from "solid-js";
import { Input } from "./input";
import { Textarea } from "./textarea";
import type { InputNativeProps } from "./types";

export function Native(props: InputNativeProps) {
  return (
    <Show
      fallback={<Input {...(props as any)} />}
      when={props.type === "textarea"}
    >
      <Textarea {...props} />
    </Show>
  );
}
