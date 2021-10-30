import { render } from "react-dom";

const Foo = () => (
  <div role={"foo-container"}>
    <div role={"foo1"}>foo1</div>
    <div role={"foo2"}>foo2</div>
  </div>
);

const App = () => {
  return (
    <div testid-root={"root1"}>
      <div testid-root={"root2"}>
        <div testid-root={"root3"} role={"hello"}>
          <div role={"text1"}>inside root3</div>
          <input name={"input"} role={"my-input"} type={"text"} />
        </div>
        <Foo testid-root={"foo-parent"} />
      </div>
      <div role={"hint"} data-testid={"in app"}>
        in app
      </div>
    </div>
  );
};

render(<App />, document.getElementById("app"));
