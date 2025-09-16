import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { Paginator } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [p, setP] = createStore({
    disabled: false,
  });
  const [currPage, setCurrPage] = createSignal(3);
  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Paginator
            currPage={currPage()}
            disabled={p.disabled}
            onPageClick={(page) => {
              setCurrPage(page);
            }}
            pageSize={8}
            total={87}
          />
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setP} properties={p} />
    </Playground>
  );
}
