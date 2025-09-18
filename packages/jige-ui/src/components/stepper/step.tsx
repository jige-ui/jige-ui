import { AnimatedGroup } from "jige-core";
import { type ComponentProps, splitProps } from "solid-js";
import { oneStepContext } from "./context";

export function Step(
  props: {
    step: any;
  } & Omit<ComponentProps<typeof AnimatedGroup.Panel>, "key">
) {
  const Context = oneStepContext.initial({
    stepKey: () => props.step as string,
  });

  const [localProps, others] = splitProps(props, ["children", "step"]);

  return (
    <AnimatedGroup.Panel key={localProps.step as string} {...others}>
      <Context.Provider>{localProps.children}</Context.Provider>
    </AnimatedGroup.Panel>
  );
}
