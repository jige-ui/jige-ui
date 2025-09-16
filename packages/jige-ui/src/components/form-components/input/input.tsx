import styles from "sass:./input.scss";
import { Match, Switch } from "solid-js";
import { mountStyle } from "solid-tiny-utils";

import { NormalInput } from "./normal-input";
import { PasswordInput } from "./password-input";
import { Textarea } from "./textarea";
import type { JigeInputProps } from "./types";

export function Input(props: JigeInputProps) {
  mountStyle(styles, "jige-ui-input");
  return (
    <Switch fallback={<NormalInput {...props} />}>
      <Match when={props.type === "textarea"}>
        <Textarea {...props} />
      </Match>
      <Match when={props.type === "password"}>
        <PasswordInput {...props} />
      </Match>
    </Switch>
  );
}
