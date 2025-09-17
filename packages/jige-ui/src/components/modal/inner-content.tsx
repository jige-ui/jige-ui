import { type ComponentProps, splitProps } from "solid-js";
import { combineStyle } from "solid-tiny-utils";

export function InnerContent(props: ComponentProps<"div">) {
  const [localProps, others] = splitProps(props, ["style"]);
  return (
    <div
      {...others}
      style={combineStyle(
        {
          padding: "16px",
        },
        localProps.style
      )}
    />
  );
}
