import { createStore } from "solid-js/store";
import { Dynamic } from "solid-js/web";
import { Scrollbar } from "~/build";
import { Playground } from "../../../components/playground";

export default function Demo() {
  const [s, setS] = createStore({
    showMask: false,
    original: false,
  });

  return (
    <Playground>
      <Playground.MainArea>
        <div>
          <Dynamic
            component={s.original ? "div" : Scrollbar}
            showMask={s.showMask}
          >
            <div
              style={{
                height: "300px",
                width: "600px",
                overflow: s.original ? "auto" : undefined,
                "scrollbar-width": s.original ? "thin" : undefined,
                "scrollbar-gutter": s.original ? "stable" : undefined,
              }}
            >
              <div class="h-1000px w-1000px p-4">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </div>
            </div>
          </Dynamic>
        </div>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
