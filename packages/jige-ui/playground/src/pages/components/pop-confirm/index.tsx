import { createStore } from "solid-js/store";
import { sleep } from "solid-tiny-utils";
import { Button, PopConfirm, useToast } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [p, setP] = createStore({
    title: "warning",
    description: "Are you sure to delete this item?",
    placement: "top" as const,
  });

  const $t = useToast();

  return (
    <Playground>
      <Playground.MainArea>
        <PopConfirm
          description={p.description}
          onConfirm={async () => {
            await sleep(1500);
            $t.success("Confirmed");
          }}
          placement={p.placement}
          title={p.title}
        >
          <Button label="Click me" />
        </PopConfirm>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          trigger: ["hover", "click", "manual"],
          placement: [
            "top",
            "right",
            "bottom",
            "left",
            "top-start",
            "top-end",
            "right-start",
            "right-end",
            "bottom-start",
            "bottom-end",
            "left-start",
            "left-end",
          ],
        }}
      />
    </Playground>
  );
}
