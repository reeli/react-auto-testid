import { render } from "@testing-library/react";

describe("custom jsx runtime", () => {
  it("should use combine testid-root and role in final test id", async () => {
    const { findByTestId } = render(
      <div testid-root={"root"}>
        <div role={"text"}>text</div>
      </div>,
    );
    const node = await findByTestId("root.text");

    expect(node).toBeTruthy();
  });

  it("should combine all of them to prefix of the final test id when nodes parents contains multiple testid-root", async () => {
    const { findByTestId } = render(
      <div testid-root={"root1"}>
        <div testid-root={"root2"}>
          <div testid-root={"root3"}>
            <div role={"child"}>text</div>
          </div>
        </div>
      </div>,
    );
    const node = await findByTestId("root1.root2.root3.child");

    expect(node).toBeTruthy();
  });

  it("should use name when both role and name are defined", async () => {
    const { findByTestId } = render(
      <div testid-root={"root"}>
        <input role={"input"} name={"my-input"} />
      </div>,
    );
    const node = await findByTestId("root.my-input");

    expect(node).toBeTruthy();
  });

  it("should not combine them to final test id when given name and role is empty", async () => {
    const { findByPlaceholderText } = render(
      <div testid-root={"root"}>
        <input role={""} name={""} placeholder={"input-placeholder"} />
      </div>,
    );
    const node = await findByPlaceholderText("input-placeholder");

    expect(node.getAttribute("data-testid")).toEqual("root");
  });

  it("should not generate test id if no testid-root provided", async () => {
    const { findByPlaceholderText } = render(<input placeholder={"input-placeholder"} />);
    const node = await findByPlaceholderText("input-placeholder");

    expect(node.getAttribute("data-testid")).toBeNull();
  });

  it("should convert role to test id if no testid-root provided", async () => {
    const { findByPlaceholderText } = render(<input role="input" placeholder={"input-placeholder"} />);
    const node = await findByPlaceholderText("input-placeholder");

    expect(node.getAttribute("data-testid")).toEqual("input");
  });

  it("should correctly set test id if testid-root is defined in a component", async () => {
    const MockComp = () => <div role={"text"}>text</div>;
    const { findByTestId } = render(<MockComp testid-root={"parent"} />);
    const node = await findByTestId("parent.text");

    expect(node).toBeTruthy();
  });

  it("should set test id for testid-root node if it contains role or name property", async () => {
    const { findByTestId } = render(
      <div testid-root={"root1"}>
        <div testid-root={"root2"} role={"text"}>
          text
        </div>
        <input testid-root={"root2"} name={"input"} />
      </div>,
    );
    const textNode = await findByTestId("root1.text");
    const inputNode = await findByTestId("root1.input");

    expect(textNode).toBeTruthy();
    expect(inputNode).toBeTruthy();
  });

  it("should set parent role to test id if parent not set testid-root", async () => {
    const { findByPlaceholderText } = render(
      <div role={"container"}>
        <input role={"input"} placeholder={"input-placeholder"} />
      </div>,
    );
    const node = await findByPlaceholderText("input-placeholder");

    expect(node.getAttribute("data-testid")).toEqual("container.input");
  });

  it("should not set parent role to test id if parent set both role and testid-root", async () => {
    const { findByPlaceholderText } = render(
      <div testid-root={"root"} role={"container"}>
        <input role={"input"} placeholder={"input-placeholder"} />
      </div>,
    );
    const node = await findByPlaceholderText("input-placeholder");

    expect(node.getAttribute("data-testid")).toEqual("root.input");
  });

  it("should not override if test id already existed", async () => {
    const { findByPlaceholderText } = render(
      <div testid-root={"root"}>
        <input role={"input"} placeholder={"input-placeholder"} data-testid={"my-input"}/>
      </div>,
    );
    const node = await findByPlaceholderText("input-placeholder");

    expect(node.getAttribute("data-testid")).toEqual("my-input");
  });
});
