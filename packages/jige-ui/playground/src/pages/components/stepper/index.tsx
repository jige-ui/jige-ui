import { ModalCore } from "jige-core";
import { createStore } from "solid-js/store";
import { Button, createStepper, Input, Modal, useStepper } from "~/build";
import { Playground } from "../../../components/playground";

type Steps = {
  step1: {
    title: string;
    content: string;
  };
  step2: {
    username: string;
    password: string;
  };
  step3: true;
};

function Step1() {
  const step = useStepper<Steps, "step1">();

  return (
    <>
      <Modal.Header title="Step1" />
      <Modal.InnerContent>
        <div>title</div>
        <Input
          onChange={(v) => step.setStore("title", v)}
          value={step.store.title}
        />
        <div>content</div>
        <Input
          onChange={(v) => step.setStore("content", v)}
          value={step.store.content}
        />
      </Modal.InnerContent>
      <Modal.Footer>
        <Button onClick={() => step.switchStep("step2")}>Next</Button>
      </Modal.Footer>
    </>
  );
}

function Step2() {
  const step = useStepper<Steps, "step2">();

  return (
    <>
      <Modal.Header title="Step 2" />
      <Modal.InnerContent>
        <div>username</div>
        <Input
          onChange={(v) => step.setStore("username", v)}
          value={step.store.username}
        />
        <div>password</div>
        <Input
          onChange={(v) => step.setStore("password", v)}
          value={step.store.password}
        />
      </Modal.InnerContent>
      <Modal.Footer>
        <Button onClick={() => step.switchStep("step1")}>Prev</Button>
        <Button onClick={() => step.switchStep("step3")}>Next</Button>
      </Modal.Footer>
    </>
  );
}

function Step3() {
  const [, modalActs] = ModalCore.useContext();
  const step = useStepper<Steps, "step3">();

  return (
    <>
      <Modal.Header title="Step 3" />
      <Modal.InnerContent>
        <div>All steps completed!</div>
        <div>Step1 data: {JSON.stringify(step.getStepStore("step1"))}</div>
        <div>Step2 data: {JSON.stringify(step.getStepStore("step2"))}</div>
      </Modal.InnerContent>
      <Modal.Footer>
        <Button
          onClick={() => {
            modalActs.setOpen(false);
          }}
        >
          OK
        </Button>
      </Modal.Footer>
    </>
  );
}

export default function Demo() {
  const [s, setS] = createStore({
    size: 24,
    enabled: true,
  });

  const step = createStepper<Steps>({
    step1: { title: "title", content: "content" },
    step2: { username: "", password: "" },
    step3: true,
  });

  return (
    <Playground>
      <Playground.MainArea>
        <Modal>
          <Modal.Trigger>
            <Button
              onClick={() => {
                step.reset();
              }}
            >
              Open Stepper Modal
            </Button>
          </Modal.Trigger>
          <Modal.Content>
            <step.Provider>
              <step.Step step="step1">
                <Step1 />
              </step.Step>
              <step.Step step="step2">
                <Step2 />
              </step.Step>
              <step.Step step="step3">
                <Step3 />
              </step.Step>
            </step.Provider>
          </Modal.Content>
        </Modal>
      </Playground.MainArea>
      <Playground.PropertySetting onChange={setS} properties={s} />
    </Playground>
  );
}
