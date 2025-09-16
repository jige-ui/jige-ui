import type { FloatingUiCoreProps } from "jige-core";
import { splitProps } from "solid-js";
import { Popover } from "../popover";
import { Content } from "./content";
import type { PopConfirmProps } from "./types";

export function PopConfirm(props: PopConfirmProps & FloatingUiCoreProps) {
  const [localProps, otherProps] = splitProps(props, [
    "title",
    "description",
    "onConfirm",
    "onCancel",
    "icon",
    "cancelText",
    "okText",
    "children",
  ]);

  return (
    <Popover
      floatingOption={{
        offset: 10,
      }}
      placement="top"
      trigger="click"
      {...otherProps}
    >
      <Popover.Trigger>{localProps.children}</Popover.Trigger>
      <Popover.Content animation="ani-floating-ui-scale" arrow={8}>
        <Content
          cancelText={localProps.cancelText}
          description={localProps.description}
          icon={localProps.icon}
          okText={localProps.okText}
          onCancel={localProps.onCancel}
          onConfirm={localProps.onConfirm}
          title={localProps.title}
        />
      </Popover.Content>
    </Popover>
  );
}
