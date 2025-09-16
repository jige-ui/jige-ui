import css from "sass:./button.scss";
import { splitProps } from "solid-js";

import { mountStyle } from "solid-tiny-utils";
import { ButtonContent } from "./button-content";
import { ButtonWrapper } from "./button-wrapper";
import { context } from "./context";
import { LoadingIcon } from "./loading-icon";
import type { ButtonElement, ButtonProps } from "./types";

export function Button<T extends string | undefined = undefined>(
  props: ButtonProps & {
    href?: T;
  } & ButtonElement<T>
) {
  mountStyle(css, "jige-ui-btn");

  const [local, others] = splitProps(props, [
    "loading",
    "variant",
    "color",
    "disabled",
    "type",
    "size",
    "icon",
    "label",
    "children",
    "href",
  ]);

  const Context = context.initial({
    loading: () => local.loading,
    variant: () => local.variant,
    color: () => local.color,
    disabled: () => local.disabled,
  });

  return (
    <Context.Provider>
      <ButtonWrapper
        {...others}
        href={local.href}
        size={local.size || "medium"}
        type={local.type || "button"}
      >
        <div class="jg-btn-overlay" />
        <ButtonContent icon={local.icon} label={local.label}>
          {local.children}
        </ButtonContent>
        <LoadingIcon />
      </ButtonWrapper>
    </Context.Provider>
  );
}
