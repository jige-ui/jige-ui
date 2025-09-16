import { createStore } from "solid-js/store";
import { Badge } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [p, setP] = createStore({
    variant: "primary" as const,
  });

  return (
    <Playground>
      <Playground.MainArea>
        <Badge variant={p.variant}>
          <div class="i-fluent:person-circle-24-regular w-1.15em h-1.15em" />{" "}
          Badge
        </Badge>
      </Playground.MainArea>
      <Playground.PropertySetting
        onChange={setP}
        properties={p}
        typeDeclaration={{
          variant: [
            "primary",
            "success",
            "warning",
            "error",
            "info",
            "outline",
          ],
        }}
      />
    </Playground>
  );
}
