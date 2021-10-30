import { render } from "react-dom";
import { Foo } from "./Foo";

const App = () => {
  return (
    <div testid-root={"root1"}>
      app
      <div testid-root={"root2"}>
        <Foo/>
      </div>
    </div>
  );
};

render(<App />, document.getElementById("app"));
